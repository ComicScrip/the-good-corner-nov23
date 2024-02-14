import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schemaIsBuilt from "./schema";
import env from "./env";

const { SERVER_PORT: port } = env;

schemaIsBuilt.then(async (schema) => {
  await db.initialize();
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`server ready on ${url}`);
});
