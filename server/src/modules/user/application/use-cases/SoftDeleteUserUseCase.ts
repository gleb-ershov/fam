import { CONTAINER_TYPES } from "./../../../../di/container/ContainerTypes";
import { inject, injectable } from "inversify";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../repositories/UserRepository";

@injectable()
export class SoftDeleteUserUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository
	) {}

	async execute(id: EntityID): Promise<User> {
		try {
			return await this.userRepository.softDeleteUser(id);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while soft deleting user"
			);
		}
	}
}
