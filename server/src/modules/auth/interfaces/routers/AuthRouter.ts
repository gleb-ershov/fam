import { Router } from "express";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { container } from "../../../../di/container";
import { IAuthController } from "../controllers/AuthContoller";

const authRouter = Router();
const authController = container.get<IAuthController>(
	CONTAINER_TYPES.AuthController
);

authRouter.post("/auth/login", (req, res) => authController.login(req, res));
authRouter.post("/auth/register", (req, res) =>
	authController.register(req, res)
);
authRouter.post("/auth/logout", (req, res) => authController.logout(req, res));

export default authRouter;
