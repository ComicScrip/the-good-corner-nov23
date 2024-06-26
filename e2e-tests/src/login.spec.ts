import { expect, test } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { hash } from "argon2";
import User from "../../backend/src/entities/User";
import { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  await page.goto("/login");

  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const u = new User();
  Object.assign(u, { email, password, nickname: "Dave", emailVerified: true });
  await u.save();

  await page.goto("/login");

  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(
    page.getByRole("button", { name: "Se déconnecter" })
  ).toBeVisible();
});

test("cannot log in with incorrect password", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const u = new User();
  Object.assign(u, { email, password, nickname: "Dave", emailVerified: true });
  await u.save();

  await page.goto("/login");

  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill("1T!ESTINg");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByTestId("login-errors")).toContainText(
    "Identifiants incorrects"
  );
});

test("cannot log in with incorrect email", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const u = new User();
  Object.assign(u, { email, password, nickname: "Dave", emailVerified: true });
  await u.save();

  await page.goto("/login");

  await page.getByTestId("login-email").fill("john.doe@mail.com");
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByTestId("login-errors")).toContainText(
    "Identifiants incorrects"
  );
});
