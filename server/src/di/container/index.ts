import { Container } from "inversify";
import { userFactory } from "./factories/userFactory";
import {
	IJWTService,
	JWTService,
} from "../../shared/services/jwtService/jwtService";
import { CONTAINER_TYPES } from "./ContainerTypes";
import {
	HashingService,
	IHashingService,
} from "../../shared/services/hashService/hashingService";

export const container = new Container();
container
	.bind<IHashingService>(CONTAINER_TYPES.HashingService)
	.to(HashingService);
container.bind<IJWTService>(CONTAINER_TYPES.JWTService).to(JWTService);
userFactory(container);
