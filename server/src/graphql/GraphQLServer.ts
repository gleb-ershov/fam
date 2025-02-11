import { globalTypeDefs } from "./globalTypeDefs";
import { globalResolvers } from "./globalResolvers";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { app } from "..";

const httpServer = http.createServer(app);
export const server = new ApolloServer({
	typeDefs: globalTypeDefs,
	resolvers: globalResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
