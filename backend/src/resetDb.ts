import db from "./db";
import Ad from "./entities/Ad";
import Category from "./entities/Category";
import Tag from "./entities/Tag";
import User from "./entities/User";

export async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
    )
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
  });
  await admin.save();

  const user = new User();
  Object.assign(user, {
    nickname: "visitor",
    email: "visitor@app.com",
    password: "Visitor42@!",
  });
  await user.save();

  const macbook = Ad.create({
    title: "Macbook pro",
    description:
      "MacBook Pro boosté par la puce M2 Pro ou M2 Max. Avec autonomie d'une journée et sublime écran Liquid Retina XDR",
    owner: "Pierre",
    price: 1500,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    location: "Lyon",
  });
  const keyboard = Ad.create({
    title: "Clavier logitech",
    description:
      "Clavier Bluetooth® fin et minimaliste avec des touches personnalisables.",
    owner: "Jane",
    price: 30,
    picture:
      "https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/pebble-keys-2-k380s/gallery/pebble-keys-2-k380s-top-tonal-graphite-gallery-ch.png?v=1",
    location: "Paris",
  });
  const peugeot = Ad.create({
    title: "Peugeot 206",
    description: "Diesel, 150000km, etat correct. CT effectué il y a 3 mois",
    owner: "Mark",
    price: 4000,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Peugeot_206_Quicksilver_90.jpg",
    location: "Paris",
  });
  const renault = Ad.create({
    title: "Renault 5",
    description: "Essence, 250000km, pour pièces",
    owner: "Amélie",
    price: 200,
    picture:
      "https://auto.cdn-rivamedia.com/photos/annonce/big/renault-r5-r-5-gtl-confort-first-owner-144710006.jpg",
    location: "Lyon",
  });
  const porsche = Ad.create({
    title: "Porsche 911",
    description: "Essence, 50000km, etat nickel",
    owner: "Steve",
    price: 50000,
    picture:
      "https://www.turbo.fr/sites/default/files/2022-01/high-mileage-991.2-porsche-911-for-sale.jpg",
    location: "Bordeaux",
  });

  const raquette = Ad.create({
    title: "Raquettes de tenis",
    description: "Lot de 5 raquettes en parfait état",
    owner: "Steve",
    price: 25,
    picture:
      "https://contents.mediadecathlon.com/p2498847/k$7fea2d8de754899d9ddb8815b541ab86/sq/raquette-de-tennis-adulte-tr110-petrol.jpg?format=auto&f=969x969",
    location: "Bordeaux",
  });

  const skis = Ad.create({
    title: "Paire de skis",
    description: "Marque Rossignol, tb état",
    owner: "Julie",
    price: 200,
    picture:
      "https://contents.mediadecathlon.com/p2332580/k$7fd9d6e45cc872a8637c81772dbb6e56/sq/ski-alpin-homme-avec-fixation-rossignol-react-6.jpg?format=auto&f=969x969",
    location: "Lyon",
  });

  const computerCat = Category.create({ name: "informatique" });
  const voitureCat = Category.create({ name: "automobile" });
  const sportCat = Category.create({ name: "sport" });
  const tag1 = Tag.create({ name: "tag1" });
  const tag2 = Tag.create({ name: "tag2" });
  const tag3 = Tag.create({ name: "tag3" });

  keyboard.category = computerCat;
  keyboard.tags = [tag1, tag2];

  macbook.category = computerCat;
  macbook.tags = [tag2, tag3];

  peugeot.category = voitureCat;
  renault.category = voitureCat;
  porsche.category = voitureCat;

  skis.category = sportCat;
  raquette.category = sportCat;

  await keyboard.save();
  await macbook.save();
  await peugeot.save();
  await renault.save();
  await porsche.save();
  await raquette.save();
  await skis.save();

  await db.destroy();
  console.log("done !");
}

main();
