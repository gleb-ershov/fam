import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "../modules/user/infrastructure/graphql/schema";
import { postTypeDefs } from "../modules/post/infrastructure/graphql/schema";

export const globalTypeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs]);
