import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "../consts/http-status";
import { BaseError } from "./BaseError";

export class DatabaseError extends BaseError {
	constructor(message: string, details?: any) {
		super(
			message,
			"DATABASE_ERROR",
			HTTP_STATUS_INTERNAL_SERVER_ERROR.code,
			details
		);
	}
}
