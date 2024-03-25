import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User, {
  LoginInput,
  NewUserInput,
  UpdateUserInput,
} from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import {
  Context,
  PublicKeyCredentialCreationOptionsJSON,
  VerifiedRegistrationResponse,
} from "../types";
import mailer from "../mailer";
import crypto from "crypto";
import Credential, { CredentialInput } from "../entities/Credential";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

// Human-readable title for your website
const rpName = "The Good Corner";
// A unique identifier for your website
const rpID = "localhost";

@Resolver()
class UserResolver {
  @Query(() => String)
  async challenge() {
    return crypto.randomUUID();
  }

  @Mutation(() => PublicKeyCredentialCreationOptionsJSON)
  async signupPasswordlessOptions(
    @Arg("username") username: string,
    @Arg("displayname") displayname: string
  ) {
    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: username,
      userName: displayname,
      // Don't prompt users for additional information about the authenticator
      // (Recommended for smoother UX)
      attestationType: "none",
      // Prevent users from re-registering existing authenticators
      excludeCredentials: [],
      authenticatorSelection: {
        residentKey: "discouraged",
        userVerification: "preferred",
      },
    });

    console.log("options sent by server", JSON.stringify({ options }, null, 2));

    return options;
  }

  @Mutation(() => Boolean)
  async registerWebAuthnCredential(
    @Arg("credential") cred: CredentialInput,
    @Arg("challenge") challenge: string
  ) {
    console.log("hey", JSON.stringify({ cred }, null, 2));

    try {
      const verification = await verifyRegistrationResponse({
        response: {
          id: cred.id,
          rawId: cred.rawId,
          type: "public-key",
          clientExtensionResults: cred.clientExtensionResults,
          response: { ...cred.response, transports: cred.response.transports },
          authenticatorAttachment: cred.authenticatorAttachment,
        },
        expectedChallenge: challenge,
        expectedOrigin: `http://${rpID}:3000`,
        expectedRPID: rpID,
        requireUserVerification: false,
      });
      return verification.verified;
    } catch (err: any) {
      console.error({ err });
    }
  }

  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);

    const token = crypto.randomBytes(20).toString("hex");

    newUser.emailConfirmationToken = token;

    await mailer.sendMail({
      subject: "Bienvenue sur TGC !",
      to: newUser.email,
      from: env.EMAIL_FROM,
      text: `Bienvenue parmi nous ${newUser.nickname}. Merci de bien vouloir cliquer sur ce lien pour confirmer votre email : ${env.FRONTEND_URL}/emailConfirmation?token=${token}`,
    });

    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("token") token: string) {
    const user = await User.findOneBy({ emailConfirmationToken: token });

    if (user === null)
      throw new GraphQLError("the token is invalid ou expired");

    user.emailVerified = true;
    user.emailConfirmationToken = null;

    user.save();
    return "ok";
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
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

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: Context) {
    if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");
    return User.findOneOrFail({
      where: { id: ctx.currentUser.id },
      relations: { ads: true },
    });
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    ctx.res.clearCookie("token");
    return "ok";
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: UpdateUserInput
  ) {
    if (!ctx.currentUser)
      throw new GraphQLError("you need to be logged in to updateyour profile");

    if (data.avatar) ctx.currentUser.avatar = data.avatar;
    if (data.nickname) ctx.currentUser.nickname = data.nickname;

    return ctx.currentUser.save();
  }
}

export default UserResolver;
