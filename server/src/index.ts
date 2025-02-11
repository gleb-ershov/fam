import express from "express";
import { setupGraphQLRouter } from "./graphql/GraphQLRouter";
export const app = express();
setupGraphQLRouter(app);
