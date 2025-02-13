import { globalTypeDefs } from "./globalTypeDefs";
import { ApolloServer } from "@apollo/server";
import { GraphQLContext } from "./GraphQLContext";
import { globalResolvers } from "./globalResolvers";

export const server = new ApolloServer<GraphQLContext>({
	typeDefs: globalTypeDefs,
	resolvers: globalResolvers,
});
