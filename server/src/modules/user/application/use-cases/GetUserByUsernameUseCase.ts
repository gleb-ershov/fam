import { CONTAINER_TYPES } from "./../../../../di/container/ContainerTypes";
import { inject, injectable } from "inversify";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../repositories/UserRepository";
import { TUserField } from "../types";

@injectable()
export class GetUserByUsernameUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository
	) {}

	async execute(
		username: User["username"],
		fields?: TUserField[]
	): Promise<User> {
		try {
			return await this.userRepository.getByUsername(username, fields);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while retrieving user by username"
			);
		}
	}
}
