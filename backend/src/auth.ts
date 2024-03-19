import { AuthChecker } from "type-graphql";
import { Context } from "./types";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import env from "./env";
import User from "./entities/User";

export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  const { headers } = context.req;
  const tokenInCookie = cookie.parse(headers.cookie ?? "").token;
  const tokenInAuthHeaders = headers.authorization?.split(" ")[1];

  const token = tokenInAuthHeaders ?? tokenInCookie;
  if (typeof token !== "string") return false;

  const decoded = (await jwt.verify(token, env.JWT_PRIVATE_KEY)) as any;
  if (!decoded?.userId) return false;

  const currentUser = await User.findOneByOrFail({ id: decoded?.userId });
  if (currentUser === null) return false;

  context.currentUser = currentUser;
  return true;
};
