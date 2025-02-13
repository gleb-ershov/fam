import { mergeResolvers } from "@graphql-tools/merge";
import { authResolvers } from "../modules/auth/graphql/resolvers";
import { postResolvers } from "../modules/post/infrastructure/graphql/resolvers";
import { userResolvers } from "../modules/user/infrastructure/graphql/resolvers";

export const globalResolvers = mergeResolvers([
	userResolvers,
	postResolvers,
	authResolvers,
]);
