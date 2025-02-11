import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { AuthService } from "../../application/services/AuthService";
import { LoginDTO } from "../../application/dtos/LoginDTO";
import { RegisterDTO } from "../../application/dtos/RegisterDTO";

export interface IAuthController {
	login: (req: Request, res: Response) => Promise<void>;
	register: (req: Request, res: Response) => Promise<void>;
	logout: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class AuthController implements IAuthController {
	constructor(
		@inject(CONTAINER_TYPES.AuthService) private authService: AuthService
	) {}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const loginCredentials: LoginDTO = req.body;
			const { accessToken, refreshToken } = await this.authService.login(
				loginCredentials
			);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			}).cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});
		} catch (error) {}
	}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const registerCredentials: RegisterDTO = req.body;
			await this.authService.register(registerCredentials);
			res.redirect(303, "/login");
		} catch (error) {}
	}

	async logout(req: Request, res: Response) {
		try {
			res.clearCookie("refreshToken", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			}).clearCookie("accessToken", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});
			res.status(200).json({ message: "Logged out successfully" });
		} catch (error) {
			res.status(500).json({ error: "Logout failed" });
		}
	}
}
