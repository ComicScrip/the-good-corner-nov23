import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import crypto from "crypto";
import User, {
  LoginInput,
  NewUserInput,
  UpdateUserInput,
} from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../types";
import mailer from "../mailer";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);
    const emailConfirmationToken = crypto.randomBytes(20).toString("hex");
    newUser.emailConfirmationToken = emailConfirmationToken;
    const newUserWithId = await newUser.save();

    await mailer.sendMail({
      text: `Bonjour ${newUserWithId.nickname}, merci de bien cliquer sur ce lien pour confirmer votre adresse : ${env.FRONTEND_URL}/emailConfirmation?token=${emailConfirmationToken}`,
      to: newUserWithId.email,
      from: env.EMAIL_FROM,
    });

    return newUserWithId;
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("confirmationToken") confirmationToken: string) {
    const userWithConfimrationToken = await User.findOneBy({
      emailConfirmationToken: confirmationToken,
    });
    if (userWithConfimrationToken === null)
      return new GraphQLError("invalid or expired token");

    userWithConfimrationToken.emailConfirmationToken = null;
    userWithConfimrationToken.emailVerified = true;

    await userWithConfimrationToken.save();

    return "ok";
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser === null) throw new GraphQLError("Invalid Credentials");
    const passwordVerified = await verify(
      existingUser.hashedPassword,
      data.password
    );
    if (!passwordVerified) throw new GraphQLError("Invalid Credentials");

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
