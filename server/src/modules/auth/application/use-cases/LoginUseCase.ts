import { injectable, inject } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IUserRepository } from "../../../user/application/repositories/UserRepository";
import { AuthResponseDTO } from "../dtos/AuthResponseDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { IHashingService } from "../../../../shared/services/hashService/hashingService";
import { IJWTService } from "../../../../shared/services/jwtService/jwtService";

@injectable()
export class LoginUserUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository,
		@inject(CONTAINER_TYPES.HashingService)
		private hashingService: IHashingService,
		@inject(CONTAINER_TYPES.JWTService)
		private jwtService: IJWTService
	) {}

	async execute(data: LoginDTO): Promise<AuthResponseDTO> {
		const existingUser = await this.userRepository.getByUsername(
			data.username
		);

		const existingUserHash = existingUser.getHashedPassword();

		const comparePasswordsResult =
			await this.hashingService.comparePasswords(
				data.password,
				existingUserHash
			);
		if (!comparePasswordsResult) {
			// to do smth
		}
		const userId = existingUser.getId();
		if (!userId) {
			throw new Error("User Id is not defined");
		}
		const username = existingUser.getUsername();
		const email = existingUser.getEmail();

		const tokenPair = this.jwtService.generateTokenPair({
			username,
			email,
			userId,
		});

		return tokenPair;
	}
}
