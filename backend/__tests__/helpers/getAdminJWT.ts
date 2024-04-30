import jwt from "jsonwebtoken";
import User, { UserRole } from "../../src/entities/User";
import env from "../../src/env";

export default async function () {
  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();
  const JWT = jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);

  return { JWT, admin };
}
