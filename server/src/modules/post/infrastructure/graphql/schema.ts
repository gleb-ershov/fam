export const postTypeDefs = `#graphql
	type PostDTO {
		id: String!
		authorId: String!
		content: String!
		media_urls: [String]
	}

	type CreatePostDTO {
		authorId: String!
    	content: String!
    	media_urls: [String]
	}
	
	type UpdatePostDTO {
		authorId: String
    	content: String
    	media_urls: [String]
	}

	type Query {
		getPostById(id: String!): PostDTO
	}
	
	type Mutations {
		deletePost(id: String!): PostDTO
		createPost(data: CreatePostDTO): PostDTO
		updatePost(id: String!, data: UpdatePostDTO): PostDTO
	}
`;
