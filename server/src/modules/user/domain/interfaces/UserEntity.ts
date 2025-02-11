export interface UserEntity {
	getId: () => string | undefined;
	getEmail: () => string;
	getHashedPassword: () => string;
	getName: () => string;
	getUsername: () => string;
	getBirthdate: () => string;
	getImageUrl: () => string;
	getBio: () => string;
}
