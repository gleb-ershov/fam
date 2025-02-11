import { CONTAINER_TYPES } from "./../../../../di/container/ContainerTypes";
import { inject, injectable } from "inversify";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { TPostField } from "../types";
import { Post } from "../../domain/entities/Post";
import { PostDTO } from "../dtos/PostDTO";
import { CreatePostUseCase } from "../use-cases/CreatePostUseCase";
import { UpdatePostUseCase } from "../use-cases/UpdatePostUseCase";
import { GetPostByIdUseCase } from "../use-cases/GetPostByIdUseCase";
import { DeletePostUseCase } from "../use-cases/DeletePostUseCase";
import { CreatePostDTO } from "../dtos/CreatePostDTO";
import { UpdatePostDTO } from "../dtos/UpdatePostDTO";

export interface IPostService {
	createPost(data: CreatePostDTO): Promise<Post>;
	updatePost(id: EntityID, data: UpdatePostDTO): Promise<Post>;
	getPostById(id: EntityID, fields?: TPostField[]): Promise<Post>;
	deletePost(id: EntityID): Promise<void>;
}

@injectable()
export class PostService implements IPostService {
	constructor(
		@inject(CONTAINER_TYPES.CreatePostUseCase)
		private createPostUseCase: CreatePostUseCase,
		@inject(CONTAINER_TYPES.UpdatePostUseCase)
		private updatePostUseCase: UpdatePostUseCase,
		@inject(CONTAINER_TYPES.GetPostByIdUseCase)
		private getPostByIdUseCase: GetPostByIdUseCase,
		@inject(CONTAINER_TYPES.DeletePostUseCase)
		private hardDeletePostUseCase: DeletePostUseCase
	) {}

	async createPost(data: CreatePostDTO): Promise<Post> {
		return await this.createPostUseCase.execute(data);
	}

	async updatePost(id: EntityID, data: UpdatePostDTO): Promise<Post> {
		return await this.updatePostUseCase.execute(id, data);
	}

	async getPostById(id: EntityID, fields?: TPostField[]): Promise<Post> {
		return await this.getPostByIdUseCase.execute(id, fields);
	}

	async deletePost(id: EntityID): Promise<void> {
		return await this.hardDeletePostUseCase.execute(id);
	}
}
