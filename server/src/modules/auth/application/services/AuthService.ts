import { LoginUserUseCase } from "./../use-cases/LoginUseCase";
import { inject, injectable } from "inversify";
import { RegisterUserUseCase } from "../use-cases/RegisterUseCase";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { LoginDTO } from "../dtos/LoginDTO";
import { AuthResponseDTO } from "../dtos/AuthResponseDTO";
import { RegisterDTO } from "../dtos/RegisterDTO";

export interface IAuthService {
	login: (credentials: LoginDTO) => Promise<AuthResponseDTO>;
	register: (userData: RegisterDTO) => Promise<AuthResponseDTO>;
}

@injectable()
export class AuthService implements IAuthService {
	constructor(
		@inject(CONTAINER_TYPES.LoginUserUseCase)
		private loginUseCase: LoginUserUseCase,
		@inject(CONTAINER_TYPES.RegisterUserUseCase)
		private registerUseCase: RegisterUserUseCase
	) {}

	async login(credentials: LoginDTO): Promise<AuthResponseDTO> {
		return await this.loginUseCase.execute(credentials);
	}

	async register(credentials: RegisterDTO): Promise<AuthResponseDTO> {
		return await this.registerUseCase.execute(credentials);
	}
}
