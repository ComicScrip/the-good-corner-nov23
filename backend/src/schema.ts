import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import TagResolver from "./resolvers/TagResolver";
import CategoriesResolver from "./resolvers/CategoryResolver";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import CredentialResolver from "./resolvers/CredentialResolver";

export default buildSchema({
  resolvers: [
    AdResolver,
    CategoriesResolver,
    TagResolver,
    UserResolver,
    CredentialResolver,
  ],
  authChecker,
});
