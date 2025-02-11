export const userTypeDefs = `#graphql
	type UserDTO {
		id: String!
    	name: String!
    	email: String!
    	username: String!
    	birth_date: String!
    	hashedPassword: String!
    	image_url: String;
    	bio: String;
	}

	type CreateUserDTO {
		hashedPassword: String!
    	username: String!
    	name: String!
    	email: String!
		birth_date: String!
	}

	type UpdateUserDTO {
		password: String!
		username: String
		name: String
		email: String
		birth_date: String
		image_url: String
		bio: String
	}

	type Query {
		getUserByUsername(username: String!): UserDTO
		getUserById(id: String!): UserDTO
	}
	
	type Mutations {
		softDeleteUser(id: String!): UserDTO
		hardDeleteUser(id: String!): void
		createUser(data: CreateUserDTO): UserDTO
		updateUser(id: String!, data: UpdateUserDTO): UserDTO
	}
`;
