import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import User, { LoginInput } from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../types";
import Credential, {
  CredentialInput,
  PublicKeyCredentialCreationOptionsJSON,
} from "../entities/Credential";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

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

  @Mutation(() => PublicKeyCredentialCreationOptionsJSON)
  async authWebAuthnCredentialOptions(
    @Arg("username") username: string,
    @Arg("displayname") displayname: string,
    @Ctx() ctx: Context
  ) {
    const options = await generateAuthenticationOptions({
      rpID: ctx.req.hostname,
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
        response: cred,
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
        const credentialProps = { credentialPublicKey, credentialID, counter };
        const c = Credential.create({ ...credentialProps });

        await User.create({ email, nickname, credentials: [c] }).save();
      }

      return verified;
    } catch (err: any) {
      console.error({ err });
    }
  }

  @Mutation(() => String)
  async loginWebAuthn(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser === null || !existingUser.hashedPassword)
      throw new GraphQLError("Invalid Credentials");
    const passwordVerified = await verify(
      existingUser.hashedPassword,
      data.password
    );
    if (!passwordVerified) throw new GraphQLError("Invalid Credentials");

    if (!existingUser.emailVerified)
      throw new GraphQLError("EMAIL_NOT_VERIFIED");

    const token = jwt.sign(
      {
        userId: existingUser.id,
      },
      env.JWT_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }
}

export default CredentialResolver;
