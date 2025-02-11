import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IPostRepository } from "../repositories/PostRepository";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { Post } from "../../domain/entities/Post";
import { TPostField } from "../types";

@injectable()
export class GetPostByIdUseCase {
	constructor(
		@inject(CONTAINER_TYPES.PostRepository)
		private postRepository: IPostRepository
	) {
		this.postRepository = postRepository;
	}

	async execute(id: EntityID, fields?: TPostField[]): Promise<Post> {
		try {
			return await this.postRepository.getPostById(id, fields);
		} catch (error) {
			throw new DatabaseError("An error occurred while getting the post");
		}
	}
}
