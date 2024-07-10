import { ASTNode, graphql, GraphQLSchema, print } from "graphql";

import db, { clearDB } from "./src/db";
import getSchema from "./src/schema";
import { Maybe } from "type-graphql";
import { SessionService, KVStore } from "./src/services/SessionService";

export let schema: GraphQLSchema;

const kvMockStorage = {
  sessions: {},
} as any;

const kvStore: KVStore = {
  hGet: async (field: string, key: string) => {
    return kvMockStorage[field][key];
  },
  hSet: async (field: string, key: string, userProps: string) => {
    kvMockStorage[field][key] = userProps;
  },
  hDel: async (field: string, key: string) => {
    delete kvMockStorage[field][key];
  },
};

const sessionStore: SessionService = new SessionService(kvStore);

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
    contextValue: { ...contextValue, sessionStore },
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
