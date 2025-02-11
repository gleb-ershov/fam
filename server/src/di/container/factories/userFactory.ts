import { CONTAINER_TYPES } from "./../ContainerTypes";
import { Container } from "inversify";
import { IUserRepository } from "../../../modules/user/application/repositories/UserRepository";
import {
	IUserService,
	UserService,
} from "../../../modules/user/application/services/UserService";
import { UserRepository } from "../../../modules/user/infrastructure/repositories/UserRepository";
import {
	IUserController,
	UserController,
} from "../../../modules/user/interfaces/controllers/UserController";

export const userFactory = (container: Container) => {
	container
		.bind<IUserRepository>(CONTAINER_TYPES.UserRepository)
		.to(UserRepository);
	container.bind<IUserService>(CONTAINER_TYPES.UserService).to(UserService);
	container
		.bind<IUserController>(CONTAINER_TYPES.UserController)
		.to(UserController);
};
