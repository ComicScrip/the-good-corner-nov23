import "reflect-metadata";
import express, { Request, Response } from "express";
import { validate } from "class-validator";
import db from "./db";
import Ad from "./entities/Ad";
import Category from "./entities/Category";
import Tag from "./entities/Tag";
import { In, Like } from "typeorm";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/tags", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const tags = await Tag.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
    res.send(tags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/categories", async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    const categories = await Category.find({
      relations: {
        ads: true,
      },
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
    res.send(categories);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/ads", async (req: Request, res: Response) => {
  const { tagIds, categoryId } = req.query;
  const title = req.query.title as string | undefined;

  try {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        tags: {
          id:
            typeof tagIds === "string" && tagIds.length > 0
              ? In(tagIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
        title: title ? Like(`%${title}%`) : undefined,
        category: {
          id: categoryId ? parseInt(categoryId as string, 10) : undefined,
        },
      },
      order: {
        createdAt: "desc",
      },
      take: 10,
    });
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/autocompleteAdTitle", async (req: Request, res: Response) => {
  const title = req.query.title as string | undefined;

  try {
    const ads = await Ad.find({
      select: {
        title: true,
        id: true,
      },
      where: {
        title: title ? Like(`%${title}%`) : undefined,
      },
      order: {
        title: "asc",
      },
      take: 10,
    });
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/ads", async (req: Request, res: Response) => {
  try {
    /*
      const newAd = new Ad()
      newAd.title = req.body.title
      newAd.price = req.body.price
      ...
      const newAdWithId = await newAd.save();
    */
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

app.post("/categories", async (req: Request, res: Response) => {
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

app.patch("/categories/:id", async (req: Request, res: Response) => {
  try {
    const catToUpdate = await Category.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!catToUpdate) return res.sendStatus(404);
    await Category.merge(catToUpdate, req.body);
    const errors = await validate(catToUpdate);
    if (errors.length !== 0) return res.status(422).send({ errors });

    res.send(await catToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/categories/:id", async (req: Request, res: Response) => {
  try {
    const catToDelete = await Category.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!catToDelete) return res.sendStatus(404);
    await catToDelete.remove();
    res.sendStatus(204);
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
    const tagToDelete = await Tag.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!tagToDelete) return res.sendStatus(404);
    await tagToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/ads/:id", async (req: Request, res: Response) => {
  try {
    const ad = await Ad.findOne({
      where: { id: parseInt(req.params.id, 10) },
      relations: { category: true, tags: true },
    });
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

app.patch("/tags/:id", async (req: Request, res: Response) => {
  try {
    const tagToUpdate = await Tag.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!tagToUpdate) return res.sendStatus(404);
    await Category.merge(tagToUpdate, req.body);
    const errors = await validate(tagToUpdate);
    if (errors.length !== 0) return res.status(422).send({ errors });

    res.send(await tagToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on http://localhost:${port}`);
});
