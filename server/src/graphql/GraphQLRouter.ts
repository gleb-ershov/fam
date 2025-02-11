import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { server } from "./GraphQLServer";

export const setupGraphQLRouter = async (app: express.Application) => {
	expressMiddleware(server, {
		context: async ({ req }) => ({ token: req.headers.token }),
	});
};
