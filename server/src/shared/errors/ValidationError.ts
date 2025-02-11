import { HTTP_STATUS_BAD_REQUEST } from "../consts/http-status";
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
	constructor(message: string, details?: any) {
		super(
			message,
			"VALIDATION_ERROR",
			HTTP_STATUS_BAD_REQUEST.code,
			details
		);
	}
}
