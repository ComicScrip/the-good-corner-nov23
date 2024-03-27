import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import User, { LoginInput } from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../types";
import Credential, {
  CredentialAuthInput,
  CredentialInput,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from "../entities/Credential";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { isoBase64URL, isoUint8Array } from "@simplewebauthn/server/helpers";

// Human-readable title for your website
const rpName = "The Good Corner";

@Resolver()
class CredentialResolver {
  @Mutation(() => PublicKeyCredentialCreationOptionsJSON)
  async registerWebAuthnCredentialOptions(
    @Arg("username") username: string,
    @Arg("displayname") displayname: string,
    @Ctx() ctx: Context
  ) {
    const options = await generateRegistrationOptions({
      rpName,
      rpID: ctx.req.hostname,
      userID: username,
      userName: displayname,
      attestationType: "none",
      excludeCredentials: [], // Prevent users from re-registering existing authenticators
      authenticatorSelection: {
        residentKey: "discouraged",
        userVerification: "preferred",
      },
    });

    return options;
  }

  @Mutation(() => Boolean)
  async registerWebAuthnCredential(
    @Arg("credential") cred: CredentialInput,
    @Arg("challenge") challenge: string,
    @Arg("username") email: string,
    @Arg("displayname") nickname: string,
    @Ctx() ctx: Context
  ) {
    try {
      const { verified, registrationInfo } = await verifyRegistrationResponse({
        response: { ...cred, type: "public-key" },
        expectedChallenge: challenge,
        expectedOrigin: env.FRONTEND_URL,
        expectedRPID: ctx.req.hostname,
        requireUserVerification: false,
      });

      if (verified && registrationInfo) {
        const existingUserWithEmail = await User.findOne({ where: { email } });
        if (existingUserWithEmail)
          throw new GraphQLError("EMAIL_ALREADY_EXISTS");

        const { credentialPublicKey, credentialID, counter } = registrationInfo;
        const { transports = [] } = cred.response;
        const credentialProps = {
          credentialPublicKey,
          credentialID,
          counter,
          transports,
        };
        const c = Credential.create({ ...credentialProps });

        await User.create({ email, nickname, credentials: [c] }).save();
      }

      return verified;
    } catch (err: any) {
      console.error({ err });
    }
  }

  @Mutation(() => PublicKeyCredentialRequestOptionsJSON)
  async authWebAuthnCredentialOptions(
    @Arg("username") email: string,
    @Ctx() ctx: Context
  ) {
    const user = await User.findOne({
      where: { email },
      relations: { credentials: true },
    });

    if (!user) throw new GraphQLError("USER_NOT_FOUND");

    const options = await generateAuthenticationOptions({
      rpID: ctx.req.hostname,
      userVerification: "preferred",
      timeout: 60000,
      allowCredentials: user.credentials.map((c) => ({
        id: c.credentialID,
        type: "public-key",
        transports: c.transports,
      })),
    });
    return options;
  }

  @Mutation(() => String)
  async authWebAuthnCredential(
    @Arg("username") email: string,
    @Arg("challenge") challenge: string,
    @Arg("credential") cred: CredentialAuthInput,

    @Ctx() ctx: Context
  ) {
    const user = await User.findOne({
      where: { email },
      relations: { credentials: true },
    });

    if (!user) throw new GraphQLError("Invalid Credentials");

    const bodyCredIDBuffer = isoBase64URL.toBuffer(cred.rawId);

    const authenticator = user.credentials.find((c) =>
      isoUint8Array.areEqual(c.credentialID, bodyCredIDBuffer)
    );

    if (!authenticator) throw new GraphQLError("Invalid Credentials");

    //  if (!passwordVerified) throw new GraphQLError("Invalid Credentials");

    const { verified, authenticationInfo } = await verifyAuthenticationResponse(
      {
        expectedChallenge: challenge,
        authenticator,
        expectedOrigin: env.FRONTEND_URL,
        expectedRPID: ctx.req.hostname,
        response: { ...cred, type: "public-key" },
      }
    );

    if (!verified) throw new GraphQLError("Invalid Credentials");

    authenticator.counter = authenticationInfo.newCounter;
    await authenticator.save();

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY, {
      expiresIn: "30d",
    });

    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }
}

export default CredentialResolver;
