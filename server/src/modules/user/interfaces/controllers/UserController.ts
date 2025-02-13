import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { UserService } from "../../application/services/UserService";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { UserDTO } from "../../application/dtos/UserDTO";
import {
	HTTP_STATUS_BAD_REQUEST,
	HTTP_STATUS_CREATED,
	HTTP_STATUS_NOT_FOUND,
	HTTP_STATUS_OK,
} from "../../../../shared/consts/http-status";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";

export interface IUserController {
	createUser: (req: Request, res: Response) => Promise<void>;
	getUserById: (req: Request, res: Response) => Promise<void>;
	getUserByUsername: (req: Request, res: Response) => Promise<void>;
	softDeleteUser: (req: Request, res: Response) => Promise<void>;
	hardDeleteUser: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class UserController implements IUserController {
	constructor(
		@inject(CONTAINER_TYPES.UserService) private userService: UserService
	) {}

	async createUser(req: Request, res: Response): Promise<void> {
		try {
			const userData: UserDTO & { hashedPassword: string } = req.body;
			const user = await this.userService.createUser(userData);
			res.status(HTTP_STATUS_CREATED.code).json(UserMapper.toDTO(user));
		} catch (error) {
			res.status(HTTP_STATUS_BAD_REQUEST.code).json({
				message: HTTP_STATUS_BAD_REQUEST.message,
			});
		}
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const _entityID = new EntityID(id);
			const user = await this.userService.getUserById(_entityID);
			res.status(HTTP_STATUS_OK.code).json(UserMapper.toDTO(user));
		} catch (error) {
			res.status(HTTP_STATUS_NOT_FOUND.code).json({
				message: HTTP_STATUS_NOT_FOUND.message,
			});
		}
	}

	async getUserByUsername(req: Request, res: Response): Promise<void> {
		try {
			const { username } = req.params;
			const user = await this.userService.getUserByUsername(username);
			res.status(HTTP_STATUS_OK.code).json(UserMapper.toDTO(user));
		} catch (error) {
			res.status(HTTP_STATUS_NOT_FOUND.code).json({
				message: HTTP_STATUS_NOT_FOUND.message,
			});
		}
	}

	async softDeleteUser(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const _entityID = new EntityID(id);
			const user = await this.userService.softDeleteUser(_entityID);
			res.status(200).json(UserMapper.toDTO(user));
		} catch (error) {
			res.status(HTTP_STATUS_BAD_REQUEST.code).json({
				message: HTTP_STATUS_BAD_REQUEST.message,
			});
		}
	}

	async hardDeleteUser(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const _entityID = new EntityID(id);
			await this.userService.hardDeleteUser(_entityID);
			res.status(204).send();
		} catch (error) {
			res.status(HTTP_STATUS_BAD_REQUEST.code).json({
				message: HTTP_STATUS_BAD_REQUEST.message,
			});
		}
	}
}
