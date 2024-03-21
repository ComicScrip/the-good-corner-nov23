import { load } from "ts-dotenv";

export default load({
  DB_HOST: String,
  DB_PORT: Number,
  DB_USER: String,
  DB_PASS: String,
  DB_NAME: String,
  SERVER_PORT: Number,
  JWT_PRIVATE_KEY: String,
  CORS_ALLOWED_ORIGINS: String,
  NODE_ENV: String,
  SMTP_HOST: String,
  SMTP_PORT: Number,
  SMTP_USER: String,
  SMTP_PASS: String,
  EMAIL_FROM: String,
  FRONTEND_URL: String,
});
