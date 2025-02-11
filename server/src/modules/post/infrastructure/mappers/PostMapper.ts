import { Types } from "mongoose";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { Post } from "../../domain/entities/Post";
import { PostDTO } from "../../application/dtos/PostDTO";
import { IPostDocument } from "../schemas/PostSchema";

export class PostMapper {
	static toEntity(postDocument: IPostDocument): Post {
		if (!postDocument) {
			throw new Error("Invalid user document");
		}

		const postData = {
			authorId: postDocument.authorId,
			content: postDocument.content,
			media_urls: postDocument.media_urls,
		};

		return new Post(postData, new EntityID(postDocument._id.toString()));
	}

	static toDatabase(post: Post): Partial<IPostDocument> {
		return {
			_id: new Types.ObjectId(post.getId()),
			content: post.getContent(),
			authorId: post.getAuthorId(),
			media_urls: post.getMedia(),
		};
	}

	static toDTO(post: Post): PostDTO {
		return {
			id: post.getId() || "",
			content: post.getContent(),
			authorId: post.getAuthorId(),
			media_urls: post.getMedia(),
		};
	}
}
