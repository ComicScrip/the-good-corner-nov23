import { ApolloClient, InMemoryCache } from "@apollo/client";
const uri = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

console.log({ uri });

const client = new ApolloClient({
	uri: uri || "http://192.168.1.207:4001/graphql",
	cache: new InMemoryCache(),
	credentials: "include",
});

export default client;
