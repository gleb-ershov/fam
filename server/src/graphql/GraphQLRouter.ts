import { expressMiddleware } from "@apollo/server/express4";
import { server } from "./GraphQLServer";
import { container } from "../di/container";
import { Application } from "express";
import { GraphQLContext } from "./GraphQLContext";

import cors from "cors";
import express from "express";

export const setupGraphQLRouter = async (app: Application) => {
	await server.start();

	app.use(
		"/api/graphql",
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware<GraphQLContext>(server, {
			context: async ({ req, res }) => ({ req, res, container }),
		})
	);

	console.log("GraphQL API ready at /api/graphql");
};
