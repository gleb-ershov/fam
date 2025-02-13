import { Request, Response } from "express";
import { container } from "../di/container";

export interface GraphQLContext {
	res: Response;
	req: Request;
	container: typeof container;
}
