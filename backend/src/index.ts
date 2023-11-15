import express from "express";
import sqlite3 from "sqlite3";
const app = express();
const port = 4000;

const db = new sqlite3.Database("./the_good_corner.sqlite");

app.use(express.json());

let ads = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/ads", (req, res) => {
  db.all("SELECT * FROM ad", (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.send(rows);
  });
});

app.get("/ads/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(ads.find((ad) => ad.id === id));
});

app.post("/ads", (req, res) => {
  const stmt = db.prepare(
    "INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    [
      req.body.title,
      req.body.description,
      req.body.owner,
      req.body.price,
      req.body.picture,
      req.body.location,
      req.body.createdAt,
    ],
    (err: any) => {
      if (err) res.sendStatus(500);
      else res.send(req.body);
    }
  );
});

app.delete("/ads/:id", (req, res) => {
  ads = ads.filter((ad) => req.params.id !== ad.id.toString());

  /*
  for (let i = 0; i < ads.length; i++) {
    if (req.params.id === ads[i].id.toString()) ads.splice(i, 1);
  }
  */

  /*
  ads.splice(
    ads.findIndex((ad) => ad.id.toString() === req.params.id),
    1
  );
  */

  res.sendStatus(204);
});

app.patch("/ads/:id", (req, res) => {
  console.log("id of ad to update ", req.params.id);
  console.log("props to update ", req.body);

  ads = ads.map((ad) => {
    if (ad.id.toString() === req.params.id) return { ...ad, ...req.body };
    return ad;
  });

  res.send(ads.find((ad) => ad.id.toString() === req.params.id));
});

app.listen(port, () => {
  console.log("server ready");
});
