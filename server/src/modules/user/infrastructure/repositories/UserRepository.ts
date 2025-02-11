import { UserMapper } from "../mappers/UserMapper";
import { DatabaseError } from "../../../../shared/errors/DatabaseError";
import { IUserRepository } from "../../application/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import UserModel from "../schemas/UserSchema";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { TUserField } from "../../application/types";

export class UserRepository implements IUserRepository {
	createUser = async (data: User): Promise<User> => {
		try {
			const newUser = new UserModel(UserMapper.toDatabase(data));
			await newUser.save();
			return UserMapper.toEntity(newUser);
		} catch (error) {
			throw new DatabaseError("An error occurred while saving user");
		}
	};

	updateUser = async (id: EntityID, data: User): Promise<User> => {
		try {
			const updatedUser = await UserModel.findByIdAndUpdate(
				id._id,
				UserMapper.toDatabase(data),
				{ new: true, runValidators: true }
			);

			if (!updatedUser) {
				throw new Error("User not found");
			}

			return UserMapper.toEntity(updatedUser);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while updating the user"
			);
		}
	};

	getById = async (id: EntityID, fields?: TUserField[]): Promise<User> => {
		let query = UserModel.findById(id._id);

		if (fields && fields.length > 0) {
			query = query.select(fields.join(" "));
		}

		try {
			const userDocument = await query;
			if (!userDocument) throw new DatabaseError("User not found");
			return UserMapper.toEntity(userDocument);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while retrieving user by ID"
			);
		}
	};

	getByUsername = async (
		username: User["username"],
		fields?: TUserField[]
	): Promise<User> => {
		let query = UserModel.findOne({ username });

		if (fields && fields.length > 0) {
			query = query.select(fields.join(" "));
		}

		try {
			const userDocument = await query;
			if (!userDocument) throw new DatabaseError("User not found");
			return UserMapper.toEntity(userDocument);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while retrieving user by username"
			);
		}
	};

	softDeleteUser = async (id: EntityID): Promise<User> => {
		try {
			const userDocument = await UserModel.findByIdAndUpdate(
				id._id,
				{ deletedAt: new Date() },
				{ new: true }
			);
			if (!userDocument) throw new DatabaseError("User not found");
			return UserMapper.toEntity(userDocument);
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while soft deleting user"
			);
		}
	};

	hardDeleteUser = async (id: EntityID): Promise<void> => {
		try {
			const result = await UserModel.findByIdAndDelete(id._id);
			if (!result) throw new DatabaseError("User not found");
		} catch (error) {
			throw new DatabaseError(
				"An error occurred while hard deleting user"
			);
		}
	};
}
