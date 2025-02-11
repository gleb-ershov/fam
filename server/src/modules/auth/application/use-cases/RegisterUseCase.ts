import { injectable, inject } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IUserRepository } from "../../../user/application/repositories/UserRepository";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { User } from "../../../user/domain/entities/User";
import { RegisterDTO } from "../dtos/RegisterDTO";
import { AuthResponseDTO } from "../dtos/AuthResponseDTO";
import { IHashingService } from "../../../../shared/services/hashService/hashingService";
import { IJWTService } from "../../../../shared/services/jwtService/jwtService";

@injectable()
export class RegisterUserUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository,
		@inject(CONTAINER_TYPES.HashingService)
		private hashingService: IHashingService,
		@inject(CONTAINER_TYPES.JWTService)
		private jwtService: IJWTService
	) {}

	async execute(data: RegisterDTO): Promise<AuthResponseDTO> {
		const existingUser = await this.userRepository.getByUsername(
			data.username
		);
		if (existingUser)
			throw new DatabaseError("User with this email already exists");

		const existingUsername = await this.userRepository.getByUsername(
			data.username
		);
		if (existingUsername)
			throw new DatabaseError("Username is already taken");

		const hashedPassword = await this.hashingService.hashPassword(
			data.password
		);

		const user = User.create({
			...data,
			hashedPassword,
		});

		const newUser = await this.userRepository.createUser(user);

		const userId = newUser.getId();
		if (!userId) {
			throw new Error("User Id is not defined");
		}
		const username = newUser.getUsername();
		const email = newUser.getEmail();

		const tokenPair = this.jwtService.generateTokenPair({
			username,
			email,
			userId,
		});

		return tokenPair;
	}
}
