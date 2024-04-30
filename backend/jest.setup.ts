import { ASTNode, graphql, GraphQLSchema, print } from "graphql";

import db, { clearDB } from "./src/db";
import getSchema from "./src/schema";
import { Maybe } from "type-graphql";

export let schema: GraphQLSchema;

export async function execute(
  operation: ASTNode,
  variableValues?: Maybe<{
    readonly [variable: string]: unknown;
  }>,
  contextValue = {}
) {
  return await graphql({
    schema,
    source: print(operation),
    variableValues,
    contextValue,
  });
}

beforeAll(async () => {
  await db.initialize();
  schema = await getSchema;
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await db.destroy();
});
