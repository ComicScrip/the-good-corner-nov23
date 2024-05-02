import { test, expect } from "@playwright/test";
import Ad from "../../backend/src/entities/Ad";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";
import Category from "../../backend/src/entities/Category";
import User, { UserRole } from "../../backend/src/entities/User";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can view ads in db", async ({ page }) => {
  // Annonces Récentes
  const computerCat = await Category.create({ name: "informatique" }).save();
  const carCat = await Category.create({ name: "automobile" }).save();
  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();

  const visitor = new User();
  Object.assign(visitor, {
    nickname: "Visitor",
    email: "visitor@app.com",
    password: "4dminAdmin@!",
  });
  await visitor.save();

  const keyboard = await Ad.create({
    title: "Clavier logitech",
    description:
      "Clavier Bluetooth® fin et minimaliste avec des touches personnalisables.",
    price: 30,
    picture:
      "https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/pebble-keys-2-k380s/gallery/pebble-keys-2-k380s-top-tonal-graphite-gallery-ch.png?v=1",
    location: "Paris",
    category: computerCat,
    owner: visitor,
  }).save();
  const peugeot = await Ad.create({
    title: "Peugeot 206",
    description: "Diesel, 150000km, etat correct. CT effectué il y a 3 mois",
    price: 4000,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Peugeot_206_Quicksilver_90.jpg",
    location: "Paris",
    category: carCat,
    owner: admin,
  }).save();

  await page.goto("/");
  await page.getByRole("heading", { name: "Annonces Récentes" });

  await expect(page.getByTestId("ads-list")).toContainText(peugeot.title);
  await expect(page.getByTestId("ads-list")).toContainText(
    peugeot.price.toString()
  );
  await expect(page.getByTestId("ads-list")).toContainText(peugeot.title);
  await expect(page.getByTestId("ads-list")).toContainText(keyboard.title);
  await expect(page.getByTestId("ads-list")).toContainText(
    keyboard.price.toString()
  );
});
