import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { Post } from "../../domain/entities/Post";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IPostRepository } from "../repositories/PostRepository";
import { CreatePostDTO } from "../dtos/CreatePostDTO";

@injectable()
export class CreatePostUseCase {
	constructor(
		@inject(CONTAINER_TYPES.PostRepository)
		private postRepository: IPostRepository
	) {
		this.postRepository = postRepository;
	}

	async execute(data: CreatePostDTO): Promise<Post> {
		try {
			const newPost = Post.create({
				...data,
			});

			return await this.postRepository.createPost(newPost);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while creating the post"
			);
		}
	}
}
