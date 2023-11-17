import "reflect-metadata";
import express, { Request, Response } from "express";
import { validate } from "class-validator";
import db from "./db";
import { Ad } from "./entities/Ad";
import { Tag } from "./entities/Tag";
import { Category } from "./entities/Category";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/ads", async (req: Request, res: Response) => {
  try {
    const ads = await Ad.find({
      relations: {
        tags: true,
        category: true
      }
    }
    );
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/tags", async (req: Request, res: Response) => {
  try {
    const ads = await Tag.find(
    );
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/category", async (req: Request, res: Response) => {
  try {
    const ads = await Category.find(
    );
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/ads", async (req: Request, res: Response) => {
  try {

    const newAd = Ad.create(req.body);
    const errors = await validate(newAd);
    if (errors.length > 0) return res.status(422).send({ errors });
    const newAdWithId = await newAd.save();
    res.send(newAdWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/tags", async (req: Request, res: Response) => {
  try {

    const newTag = Tag.create(req.body);
    const errors = await validate(newTag);
    if (errors.length > 0) return res.status(422).send({ errors });
    const newTagWithId = await newTag.save();
    res.send(newTagWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/category", async (req: Request, res: Response) => {
  try {

    const newCategory = Category.create(req.body);
    const errors = await validate(newCategory);
    if (errors.length > 0) return res.status(422).send({ errors });
    const newCategoryWithId = await newCategory.save();
    res.send(newCategoryWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/ads/:id", async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToDelete) return res.sendStatus(404);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/tags/:id", async (req: Request, res: Response) => {
  try {
    const TagToDelete = await Tag.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!TagToDelete) return res.sendStatus(404);
    await TagToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/category/:id", async (req: Request, res: Response) => {
  try {
    const CategoryToDelete = await Category.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!CategoryToDelete) return res.sendStatus(404);
    await CategoryToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/ads/:id", async (req: Request, res: Response) => {
  try {
    const ad = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!ad) return res.sendStatus(404);
    res.send(ad);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.patch("/ads/:id", async (req: Request, res: Response) => {
  try {
    const adToUpdate = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToUpdate) return res.sendStatus(404);
    await Ad.merge(adToUpdate, req.body);
    const errors = await validate(adToUpdate);
    if (errors.length > 0) return res.status(422).send({ errors });
    res.send(await adToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on http://localhost:${port}`);
});
