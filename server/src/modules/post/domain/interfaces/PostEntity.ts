export interface PostEntity {
	getId: () => string | undefined;
	getAuthorId: () => string;
	getContent: () => string;
	getMedia: () => string[] | undefined;
}
