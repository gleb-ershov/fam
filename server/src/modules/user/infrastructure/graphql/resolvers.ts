import { GraphQLResolveInfo } from "graphql";
import { getSelectedFields } from "../../../../graphql/getSelectedFields";
import { UserDTO } from "../../application/dtos/UserDTO";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { UpdateUserDTO } from "../../application/dtos/UpdateUserDTO";
import { UserMapper } from "../mappers/UserMapper";
import { GraphQLContext } from "../../../../graphql/GraphQLContext";
import { IUserService } from "../../application/services/UserService";

export const userResolvers = {
	Query: {
		getUserByUsername: async (
			_: any,
			{ username }: { username: string },
			{ container }: GraphQLContext,
			info: GraphQLResolveInfo
		) => {
			const fields = getSelectedFields<UserDTO>(info);
			const userService = container.get<IUserService>("UserService");
			const user = await userService.getUserByUsername(username, fields);
			return UserMapper.toDTO(user);
		},
		getUserById: async (
			_: any,
			{ id }: { id: string },
			{ container }: GraphQLContext,
			info: GraphQLResolveInfo
		) => {
			const entityID = new EntityID(id);
			const fields = getSelectedFields<UserDTO>(info);
			const userService = container.get<IUserService>("UserService");
			const user = await userService.getUserById(entityID, fields);
			return UserMapper.toDTO(user);
		},
	},
	Mutations: {
		softDeleteUser: async (
			_: any,
			{ id }: { id: string },
			{ container }: GraphQLContext
		) => {
			const entityID = new EntityID(id);
			const userService = container.get<IUserService>("UserService");
			const updatedUser = await userService.softDeleteUser(entityID);
			return UserMapper.toDTO(updatedUser);
		},
		hardDeleteUser: async (
			_: any,
			{ id }: { id: string },
			{ container }: GraphQLContext
		) => {
			const entityID = new EntityID(id);
			const userService = container.get<IUserService>("UserService");
			await userService.hardDeleteUser(entityID);
		},
		createUser: async (
			_: any,
			{ data }: { data: CreateUserDTO },
			{ container }: GraphQLContext
		) => {
			const userService = container.get<IUserService>("UserService");
			const newUser = await userService.createUser(data);
			return UserMapper.toDTO(newUser);
		},
		updateUser: async (
			_: any,
			{ id, data }: { id: string; data: UpdateUserDTO },
			{ container }: GraphQLContext
		) => {
			const entityID = new EntityID(id);
			const userService = container.get<IUserService>("UserService");
			const updatedUser = await userService.updateUser(entityID, data);
			return UserMapper.toDTO(updatedUser);
		},
	},
};
