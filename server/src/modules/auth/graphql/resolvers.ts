import { GraphQLContext } from "../../../graphql/GraphQLContext";
import { LoginDTO } from "../application/dtos/LoginDTO";
import { RegisterDTO } from "../application/dtos/RegisterDTO";
import { IAuthService } from "../application/services/AuthService";

export const authResolvers = {
	Mutations: {
		login: async (
			_: any,
			{ data }: { data: LoginDTO },
			{ res, container }: GraphQLContext
		) => {
			const authService = container.get<IAuthService>("AuthService");
			const { accessToken, refreshToken } = await authService.login(data);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			}).cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});
		},
		register: async (
			_: any,
			{ data }: { data: RegisterDTO },
			{ res, container }: GraphQLContext
		) => {
			const authService = container.get<IAuthService>("AuthService");
			await authService.register(data);
			res.redirect(303, "/login");
		},
		logout: async (_: any, __: any, { res }: GraphQLContext) => {
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
		},
	},
};
