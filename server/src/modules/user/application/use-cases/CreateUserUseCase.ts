import { IUserRepository } from "../repositories/UserRepository";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { User } from "../../domain/entities/User";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository
	) {
		this.userRepository = userRepository;
	}

	async execute(data: CreateUserDTO): Promise<User> {
		try {
			const existingUser = await this.userRepository.getByUsername(
				data.username
			);
			if (existingUser) {
				throw new DatabaseError("Username is already taken");
			}

			const user = User.create({
				...data,
			});

			return await this.userRepository.createUser(user);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while creating the user"
			);
		}
	}
}
