import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import TagResolver from "./resolvers/TagResolver";
import CategoriesResolver from "./resolvers/CategoryResolver";

export default buildSchema({
  resolvers: [AdResolver, CategoriesResolver, TagResolver],
});
