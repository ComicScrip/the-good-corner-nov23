import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || undefined,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
