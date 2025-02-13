export const authTypeDefs = `#graphql
	type LoginDTO {
		username: String!
		password: String!
	}

	type RegisterDTO {
		name: String!
		username: String!
		password: String!
		email: String!
		birth_date: String!
	}

	type Mutations {
		login(data: LoginDTO): void
		register(data: RegisterDTO): void
		logout(): void
	}
`;
