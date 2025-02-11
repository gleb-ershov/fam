import { GraphQLResolveInfo } from "graphql";
import { getSelectedFields } from "../../../../graphql/getSelectedFields";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { PostDTO } from "../../application/dtos/PostDTO";
import { IPostService } from "../../application/services/PostService";
import { CreatePostDTO } from "../../application/dtos/CreatePostDTO";
import { UpdatePostDTO } from "../../application/dtos/UpdatePostDTO";
import { PostMapper } from "../mappers/PostMapper";

export const postResolvers = {
	Query: {
		getPostById: async (
			_: any,
			{ id }: { id: string },
			{ postService }: { postService: IPostService },
			info: GraphQLResolveInfo
		) => {
			const entityID = new EntityID(id);
			const fields = getSelectedFields<PostDTO>(info);
			const post = await postService.getPostById(entityID, fields);
			return PostMapper.toDTO(post);
		},
	},
	Mutations: {
		deletePost: async (
			_: any,
			{ id }: { id: string },
			{ postService }: { postService: IPostService }
		) => {
			const entityID = new EntityID(id);
			return await postService.deletePost(entityID);
		},
		createPost: async (
			_: any,
			{ data }: { data: CreatePostDTO },
			{ postService }: { postService: IPostService }
		) => {
			const newPost = await postService.createPost(data);
			return PostMapper.toDTO(newPost);
		},
		updatePost: async (
			_: any,
			{ id, data }: { id: string; data: UpdatePostDTO },
			{ postService }: { postService: IPostService }
		) => {
			const entityID = new EntityID(id);
			const newPost = await postService.updatePost(entityID, data);
			return PostMapper.toDTO(newPost);
		},
	},
};
