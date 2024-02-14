import { DataSource } from "typeorm";
import Ad from "./entities/Ad";
import Category from "./entities/Category";
import Tag from "./entities/Tag";

export default new DataSource({
  type: "sqlite",
  database: "the_good_corner.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});
