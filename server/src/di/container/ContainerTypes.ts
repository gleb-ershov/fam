function setSymbols(keys: string[]) {
	const serviceContainer = {} as Record<string, symbol>;
	keys.forEach((key) => {
		serviceContainer[key] = Symbol.for(key);
	});
	return serviceContainer;
}

const POST_TYPES_KEYS = [
	"PostService",
	"PostRepository",
	"CreatePostUseCase",
	"GetPostByIdUseCase",
	"UpdatePostUseCase",
	"DeletePostUseCase",
	"PostController",
];

const POST_TYPES = setSymbols(POST_TYPES_KEYS);

const USER_TYPES_KEYS = [
	"UserRepository",
	"CreateUserUseCase",
	"UpdateUserUseCase",
	"GetUserByIdUseCase",
	"GetUserByUsernameUseCase",
	"SoftDeleteUserUseCase",
	"HardDeleteUserUseCase",
	"UserService",
	"UserController",
];

const USER_TYPES = setSymbols(USER_TYPES_KEYS);

export const CONTAINER_TYPES = {
	// Utilities
	HashingService: Symbol.for("HashingService"),
	JWTService: Symbol.for("JWTService"),
	// Auth Flow
	LoginUserUseCase: Symbol.for("LoginUserUseCase"),
	RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
	AuthService: Symbol.for("AuthService"),
	AuthController: Symbol.for("AuthController"),
	// Entities
	...USER_TYPES,
	...POST_TYPES,
};
