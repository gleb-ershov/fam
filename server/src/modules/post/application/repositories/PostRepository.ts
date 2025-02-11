import { EntityID } from "../../../../shared/value-objects/EntityID";
import { Post } from "../../domain/entities/Post";
import { TPostField } from "../types";

export interface IPostRepository {
	createPost: (data: Post) => Promise<Post>;
	updatePost: (id: EntityID, data: Post) => Promise<Post>;
	getPostById: (id: EntityID, fields?: TPostField[]) => Promise<Post>;
	deletePost: (id: EntityID) => Promise<void>;
}
