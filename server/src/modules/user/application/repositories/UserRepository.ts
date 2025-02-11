import { EntityID } from "../../../../shared/value-objects/EntityID";
import { User } from "../../domain/entities/User";
import { TUserField } from "../types";

export interface IUserRepository {
	createUser: (data: User) => Promise<User>;
	updateUser: (id: EntityID, data: User) => Promise<User>;
	getById: (id: EntityID, fields?: TUserField[]) => Promise<User>;
	getByUsername: (username: string, fields?: TUserField[]) => Promise<User>;
	softDeleteUser: (id: EntityID) => Promise<User>;
	hardDeleteUser: (id: EntityID) => Promise<void>;
}
