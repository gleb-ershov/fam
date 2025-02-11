const POST_TYPES = {
	PostService: Symbol.for("PostService"),
	PostRepository: Symbol.for("PostRepository"),
	CreatePostUseCase: Symbol.for("CreatePostUseCase"),
	GetPostByIdUseCase: Symbol.for("GetPostByIdUseCase"),
	UpdatePostUseCase: Symbol.for("UpdatePostUseCase"),
	DeletePostUseCase: Symbol.for("DeletePostUseCase"),
	PostController: Symbol.for("PostController"),
};

const USER_TYPES = {
	UserRepository: Symbol.for("UserRepository"),

	CreateUserUseCase: Symbol.for("CreateUserUseCase"),
	UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
	GetUserByIdUseCase: Symbol.for("GetUserByIdUseCase"),
	GetUserByUsernameUseCase: Symbol.for("GetUserByUsernameUseCase"),
	SoftDeleteUserUseCase: Symbol.for("SoftDeleteUserUseCase"),
	HardDeleteUserUseCase: Symbol.for("HardDeleteUserUseCase"),

	UserService: Symbol.for("UserService"),
	UserController: Symbol.for("UserController"),
};

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
