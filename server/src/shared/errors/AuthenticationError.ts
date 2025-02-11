import { HTTP_STATUS_UNAUTHORIZED } from "../consts/http-status";
import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
	constructor(message: string, details?: any) {
		super(
			message,
			"AUTHENTICATION_ERROR",
			HTTP_STATUS_UNAUTHORIZED.code,
			details
		);
	}
}
