import { GraphQLResolveInfo } from "graphql";
import { getSelectedFields } from "../../../../graphql/getSelectedFields";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { PostDTO } from "../../application/dtos/PostDTO";
import { IPostService } from "../../application/services/PostService";
import { CreatePostDTO } from "../../application/dtos/CreatePostDTO";
import { UpdatePostDTO } from "../../application/dtos/UpdatePostDTO";
import { PostMapper } from "../mappers/PostMapper";
import { GraphQLContext } from "../../../../graphql/GraphQLContext";

export const postResolvers = {
	Query: {
		getPostById: async (
			_: any,
			{ id }: { id: string },
			{ container }: GraphQLContext,
			info: GraphQLResolveInfo
		) => {
			const entityID = new EntityID(id);
			const fields = getSelectedFields<PostDTO>(info);
			const postService = container.get<IPostService>("PostService");
			const post = await postService.getPostById(entityID, fields);
			return PostMapper.toDTO(post);
		},
	},
	Mutations: {
		deletePost: async (
			_: any,
			{ id }: { id: string },
			{ container }: GraphQLContext
		) => {
			const entityID = new EntityID(id);
			const postService = container.get<IPostService>("PostService");
			return await postService.deletePost(entityID);
		},
		createPost: async (
			_: any,
			{ data }: { data: CreatePostDTO },
			{ container }: GraphQLContext
		) => {
			const postService = container.get<IPostService>("PostService");
			const newPost = await postService.createPost(data);
			return PostMapper.toDTO(newPost);
		},
		updatePost: async (
			_: any,
			{ id, data }: { id: string; data: UpdatePostDTO },
			{ container }: GraphQLContext
		) => {
			const entityID = new EntityID(id);
			const postService = container.get<IPostService>("PostService");
			const newPost = await postService.updatePost(entityID, data);
			return PostMapper.toDTO(newPost);
		},
	},
};
