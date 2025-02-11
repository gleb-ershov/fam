import { postResolvers } from "../modules/post/infrastructure/graphql/resolvers";
import { userResolvers } from "../modules/user/infrastructure/graphql/resolvers";

export const globalResolvers = {
	Query: {
		...userResolvers.Query,
		...postResolvers.Query,
	},
	Mutations: {
		...userResolvers.Mutations,
		...postResolvers.Mutations,
	},
};

// fix ts error while using mergeResolvers
