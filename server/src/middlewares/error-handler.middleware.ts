import { Request, Response, NextFunction } from "express";
import { BaseError } from "../shared/errors/BaseError";
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "../shared/consts/http-status";

export const errorHandlerMiddleware = (
	err: BaseError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof BaseError) {
		return res.status(err.statusCode).json({
			message: err.message,
			code: err.code,
			details: err.details || null,
		});
	}

	return res.status(500).json({
		message: HTTP_STATUS_INTERNAL_SERVER_ERROR.message,
		code: HTTP_STATUS_INTERNAL_SERVER_ERROR.code,
	});
};
