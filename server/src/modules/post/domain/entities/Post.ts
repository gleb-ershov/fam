import { EntityID } from "../../../../shared/value-objects/EntityID";
import { PostEntity } from "../interfaces/PostEntity";

export type TPost = {
	authorId: string;
	content: string;
	media_urls?: string[];
};

export class Post implements PostEntity {
	private _id?: EntityID;

	private authorId: string;
	private content: string;
	private media_urls?: string[];

	constructor(data: TPost, _id?: EntityID) {
		const { authorId, content, media_urls = [] } = data;
		this._id = _id;
		this.authorId = authorId;
		this.content = content;
		this.media_urls = media_urls;
	}

	public getId(): string | undefined {
		return this._id?.id;
	}

	public getContent(): string {
		return this.content;
	}

	public getAuthorId(): string {
		return this.authorId;
	}

	public getMedia(): string[] | undefined {
		return this.media_urls;
	}

	static create(data: TPost): Post {
		return new Post(data);
	}

	static update(data: TPost, _id: string): Post {
		const entityId = new EntityID(_id);
		return new Post(data, entityId);
	}
}
