import { EntityID } from "./../../../../shared/value-objects/EntityID";
import { IUserRepository } from "../repositories/UserRepository";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { User } from "../../domain/entities/User";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { UserDTO } from "../dtos/UserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";

@injectable()
export class UpdateUserUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository
	) {
		this.userRepository = userRepository;
	}

	async execute(id: EntityID, data: UpdateUserDTO): Promise<User> {
		try {
			const existingUser = await this.userRepository.getById(id);
			if (!existingUser) {
				throw new DatabaseError(
					"User with this username already exist"
				);
			}

			const existingUserData = UserMapper.toDTO(existingUser);
			// hash via hash service later
			const hashedPassword = data.password ? data.password : "";

			const user = User.update(
				{
					...existingUserData,
					...data,
					hashedPassword,
				},
				id._id
			);

			return await this.userRepository.updateUser(id, user);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while creating the user"
			);
		}
	}
}
