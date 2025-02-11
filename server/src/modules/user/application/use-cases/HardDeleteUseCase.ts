import { CONTAINER_TYPES } from "./../../../../di/container/ContainerTypes";
import { inject, injectable } from "inversify";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { IUserRepository } from "../repositories/UserRepository";

@injectable()
export class HardDeleteUserUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository
	) {}

	async execute(id: EntityID): Promise<void> {
		try {
			await this.userRepository.hardDeleteUser(id);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while hard deleting user"
			);
		}
	}
}
