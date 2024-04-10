import { ApolloClient, InMemoryCache } from "@apollo/client";

const prodAPIUrl =
  typeof window !== "undefined" ? `${window.location.origin}/graphql` : "";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || prodAPIUrl,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
