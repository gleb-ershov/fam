import { EntityID } from "./../../../../shared/value-objects/EntityID";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { Post } from "../../domain/entities/Post";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IPostRepository } from "../repositories/PostRepository";
import { UpdatePostDTO } from "../dtos/UpdatePostDTO";
import { PostMapper } from "../../infrastructure/mappers/PostMapper";

@injectable()
export class UpdatePostUseCase {
	constructor(
		@inject(CONTAINER_TYPES.PostRepository)
		private postRepository: IPostRepository
	) {
		this.postRepository = postRepository;
	}

	async execute(id: EntityID, data: UpdatePostDTO): Promise<Post> {
		try {
			const existingPost = await this.postRepository.getPostById(id);

			if (!existingPost) {
				throw new Error("post with this id does not exist");
			}

			const existingPostData = PostMapper.toDTO(existingPost);
			const newPost = Post.update(
				{
					...existingPostData,
					...data,
				},
				id._id
			);

			return await this.postRepository.createPost(newPost);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while creating the post"
			);
		}
	}
}
