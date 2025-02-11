import { GraphQLResolveInfo } from "graphql";
import { getSelectedFields } from "../../../../graphql/getSelectedFields";
import { UserDTO } from "../../application/dtos/UserDTO";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { IUserService } from "../../application/services/UserService";
import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { UpdateUserDTO } from "../../application/dtos/UpdateUserDTO";
import { UserMapper } from "../mappers/UserMapper";

export const userResolvers = {
	Query: {
		getUserByUsername: async (
			_: any,
			{ username }: { username: string },
			{ userService }: { userService: IUserService },
			info: GraphQLResolveInfo
		) => {
			const fields = getSelectedFields<UserDTO>(info);
			const user = await userService.getUserByUsername(username, fields);
			return UserMapper.toDTO(user);
		},
		getUserById: async (
			_: any,
			{ id }: { id: string },
			{ userService }: { userService: IUserService },

			info: GraphQLResolveInfo
		) => {
			const entityID = new EntityID(id);
			const fields = getSelectedFields<UserDTO>(info);
			const user = await userService.getUserById(entityID, fields);
			return UserMapper.toDTO(user);
		},
	},
	Mutations: {
		softDeleteUser: async (
			_: any,
			{ id }: { id: string },
			{ userService }: { userService: IUserService }
		) => {
			const entityID = new EntityID(id);
			const updatedUser = await userService.softDeleteUser(entityID);
			return UserMapper.toDTO(updatedUser);
		},
		hardDeleteUser: async (
			_: any,
			{ id }: { id: string },
			{ userService }: { userService: IUserService }
		) => {
			const entityID = new EntityID(id);
			await userService.hardDeleteUser(entityID);
		},
		createUser: async (
			_: any,
			{ data }: { data: CreateUserDTO },
			{ userService }: { userService: IUserService }
		) => {
			const newUser = await userService.createUser(data);
			return UserMapper.toDTO(newUser);
		},
		updateUser: async (
			_: any,
			{ id, data }: { id: string; data: UpdateUserDTO },
			{ userService }: { userService: IUserService }
		) => {
			const entityID = new EntityID(id);
			const updatedUser = await userService.updateUser(entityID, data);
			return UserMapper.toDTO(updatedUser);
		},
	},
};
