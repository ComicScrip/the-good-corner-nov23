import express, { Request, Response } from "express";
import sqlite from "sqlite3";
import { Ad } from "../types";

const db = new sqlite.Database("the_good_corner.sqlite");

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/ads", (req: Request, res: Response) => {
  db.all("SELECT * FROM ad", (err, rows: Ad[]) => {
    if (!err) return res.send(rows);
    console.log(err);
    res.sendStatus(500);
  });
});

app.post("/ads", (req: Request, res: Response) => {
  const newAd: Ad = {
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  db.run(
    "INSERT INTO ad (title, owner, description, price, picture, location, createdAt) VALUES ($title, $owner, $description, $price, $picture, $location, $createdAt)",
    {
      $title: newAd.title,
      $owner: newAd.owner,
      $description: newAd.description,
      $price: newAd.price,
      $picture: newAd.picture,
      $location: newAd.location,
      $createdAt: newAd.createdAt,
    },
    function (this: any, err: any) {
      if (!err) return res.send({ ...newAd, id: this.lastID });
      console.log(err);
      res.sendStatus(500);
    }
  );
});

app.delete("/ads/:id", (req: Request, res: Response) => {
  db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!row) return res.sendStatus(404);
    db.run("DELETE FROM ad WHERE id = ?", [req.params.id], (err: any) => {
      if (!err) return res.sendStatus(204);
      console.log(err);
      res.sendStatus(500);
    });
  });
});

app.get("/ads/:id", (req: Request, res: Response) => {
  db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!row) return res.sendStatus(404);
    res.send(row);
  });
});

app.patch("/ads/:id", (req: Request, res: Response) => {
  db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!row) return res.sendStatus(404);

    // creates a string with this shape : "title = $title, description = $description, ..."
    const setProps = Object.keys(req.body)
      .reduce<string[]>((acc, prop) => [...acc, `${prop} = $${prop}`], [])
      .join(", ");

    // creates an object with this shape : {$title: "title sent by client", "$description: " description sent by client", ...}
    const propsToUpdate = Object.keys(req.body).reduce(
      (acc, prop) => ({ ...acc, [`$${prop}`]: req.body[prop] }),
      {}
    );

    db.run(
      `UPDATE ad SET ${setProps} WHERE id = $id`,
      { ...propsToUpdate, $id: req.params.id },
      (err: any) => {
        if (!err) return res.send({ ...row, ...req.body });
        console.log(err);
        res.sendStatus(500);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
