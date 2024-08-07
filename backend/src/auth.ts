import { AuthChecker } from "type-graphql";
import { Context } from "./types";
import cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "./env";

export const authChecker: AuthChecker<Context> = async (
  { context },
  roles: string[] = []
) => {
  const { sessionStore } = context;
  const { headers = {} } = context.req || {};
  const tokenInCookie = cookie.parse(headers.cookie ?? "").token;
  const tokenInAuthHeaders = headers.authorization?.split(" ")[1];

  const token = tokenInAuthHeaders ?? tokenInCookie;
  if (typeof token !== "string") return false;

  const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JwtPayload;
  if (!decoded?.userId) return false;

  const currentUser = await sessionStore.getUser(decoded?.userId);

  if (currentUser === null) return false;

  context.currentUser = currentUser;

  return roles.length === 0 || roles.includes(currentUser.role.toString());
};
