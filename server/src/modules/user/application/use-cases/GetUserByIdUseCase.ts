import { inject, injectable } from "inversify";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../repositories/UserRepository";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { TUserField } from "../types";

@injectable()
export class GetUserByIdUseCase {
	constructor(
		@inject(CONTAINER_TYPES.UserRepository)
		private userRepository: IUserRepository
	) {}

	async execute(id: EntityID, fields?: TUserField[]): Promise<User> {
		try {
			return await this.userRepository.getById(id, fields);
		} catch (error) {
			throw new DatabaseError("An error occurred while retrieving user");
		}
	}
}
