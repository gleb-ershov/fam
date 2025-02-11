import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IPostRepository } from "../repositories/PostRepository";
import { EntityID } from "../../../../shared/value-objects/EntityID";

@injectable()
export class DeletePostUseCase {
	constructor(
		@inject(CONTAINER_TYPES.PostRepository)
		private postRepository: IPostRepository
	) {
		this.postRepository = postRepository;
	}

	async execute(id: EntityID): Promise<void> {
		try {
			await this.postRepository.deletePost(id);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while deleting the post"
			);
		}
	}
}
