import { injectable } from "inversify";
import { IPostRepository } from "../../application/repositories/PostRepository";
import PostModel from "../schemas/PostSchema";
import { PostMapper } from "../mappers/PostMapper";
import { Post } from "../../domain/entities/Post";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { TPostField } from "../../application/types";

@injectable()
export class PostRepository implements IPostRepository {
	createPost = async (data: Post): Promise<Post> => {
		try {
			const newPost = new PostModel(PostMapper.toDatabase(data));
			await newPost.save();
			return PostMapper.toEntity(newPost);
		} catch (error) {
			throw new DatabaseError("An error occurred while saving post]");
		}
	};

	updatePost = async (id: EntityID, data: Post): Promise<Post> => {
		try {
			const updatedPost = await PostModel.findByIdAndUpdate(
				id._id,
				PostMapper.toDatabase(data),
				{ new: true, runValidators: true }
			);

			if (!updatedPost) {
				throw new Error("Post not found");
			}

			return PostMapper.toEntity(updatedPost);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while updating the user"
			);
		}
	};

	getPostById = async (
		id: EntityID,
		fields?: TPostField[]
	): Promise<Post> => {
		let query = PostModel.findById(id._id);

		if (fields && fields.length > 0) {
			query = query.select(fields.join(" "));
		}

		try {
			const postDocument = await query;
			if (!postDocument) throw new DatabaseError("User not found");
			return PostMapper.toEntity(postDocument);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while retrieving post by ID"
			);
		}
	};

	deletePost = async (id: EntityID): Promise<void> => {
		try {
			const result = await PostModel.findByIdAndDelete(id._id);
			if (!result) throw new DatabaseError("Post not found");
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while hard deleting post"
			);
		}
	};
}
