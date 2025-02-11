import { CONTAINER_TYPES } from "./../../../../di/container/ContainerTypes";
import { inject, injectable } from "inversify";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { HardDeleteUserUseCase } from "../use-cases/HardDeleteUseCase";
import { SoftDeleteUserUseCase } from "../use-cases/SoftDeleteUserUseCase";
import { GetUserByUsernameUseCase } from "../use-cases/GetUserByUsernameUseCase";
import { GetUserByIdUseCase } from "../use-cases/GetUserByIdUseCase";
import { CreateUserUseCase } from "../use-cases/CreateUserUseCase";
import { User } from "../../domain/entities/User";
import { TUserField } from "../types";
import { UpdateUserUseCase } from "../use-cases/UpdateUserUseCase";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export interface IUserService {
	createUser(data: CreateUserDTO): Promise<User>;
	updateUser(id: EntityID, data: UpdateUserDTO): Promise<User>;
	getUserById(id: EntityID, fields?: TUserField[]): Promise<User>;
	getUserByUsername(
		username: User["username"],
		fields?: TUserField[]
	): Promise<User>;
	softDeleteUser(id: EntityID): Promise<User>;
	hardDeleteUser(id: EntityID): Promise<void>;
}

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(CONTAINER_TYPES.CreateUserUseCase)
		private createUserUseCase: CreateUserUseCase,
		@inject(CONTAINER_TYPES.UpdateUserUseCase)
		private updateUserUseCase: UpdateUserUseCase,
		@inject(CONTAINER_TYPES.GetUserByIdUseCase)
		private getUserByIdUseCase: GetUserByIdUseCase,
		@inject(CONTAINER_TYPES.GetUserByUsernameUseCase)
		private getUserByUsernameUseCase: GetUserByUsernameUseCase,
		@inject(CONTAINER_TYPES.SoftDeleteUserUseCase)
		private softDeleteUserUseCase: SoftDeleteUserUseCase,
		@inject(CONTAINER_TYPES.HardDeleteUserUseCase)
		private hardDeleteUserUseCase: HardDeleteUserUseCase
	) {}

	async createUser(data: CreateUserDTO): Promise<User> {
		return await this.createUserUseCase.execute(data);
	}

	async updateUser(id: EntityID, data: UpdateUserDTO): Promise<User> {
		return await this.updateUserUseCase.execute(id, data);
	}

	async getUserById(id: EntityID, fields?: TUserField[]): Promise<User> {
		return await this.getUserByIdUseCase.execute(id, fields);
	}

	async getUserByUsername(
		username: User["username"],
		fields?: TUserField[]
	): Promise<User> {
		return await this.getUserByUsernameUseCase.execute(username, fields);
	}

	async softDeleteUser(id: EntityID): Promise<User> {
		return await this.softDeleteUserUseCase.execute(id);
	}

	async hardDeleteUser(id: EntityID): Promise<void> {
		return await this.hardDeleteUserUseCase.execute(id);
	}
}
