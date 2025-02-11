import { Router } from "express";
import { CONTAINER_TYPES } from "../../../../di/container/ContainerTypes";
import { IUserController } from "../controllers/UserController";
import { container } from "../../../../di/container";

const userRouter = Router();
const userController = container.get<IUserController>(
	CONTAINER_TYPES.UserController
);

userRouter.post("/users", (req, res) => userController.createUser(req, res));

userRouter.get("/users/:id", (req, res) =>
	userController.getUserById(req, res)
);

userRouter.get("/users/username/:username", (req, res) =>
	userController.getUserByUsername(req, res)
);

userRouter.delete("/users/delete/soft/:id", (req, res) =>
	userController.softDeleteUser(req, res)
);

userRouter.delete("/users/delete/hard/:id", (req, res) =>
	userController.hardDeleteUser(req, res)
);

export default userRouter;
