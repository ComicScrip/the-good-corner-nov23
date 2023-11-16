import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "src/the_good_corner.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
