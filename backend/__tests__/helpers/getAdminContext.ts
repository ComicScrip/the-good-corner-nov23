import getAdminJWT from "./getAdminJWT";

export default async function () {
  const { JWT } = await getAdminJWT();
  return { req: { headers: { authorization: `Bearer ${JWT}` } } };
}
