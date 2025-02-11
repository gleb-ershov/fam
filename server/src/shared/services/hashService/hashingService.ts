import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./hashingService.config";
import { injectable } from "inversify";

export interface IHashingService {
	hashPassword: (password: string) => Promise<string>;
	comparePasswords: (
		password: string,
		hashedPassword: string
	) => Promise<boolean>;
}

@injectable()
export class HashingService implements IHashingService {
	constructor() {}

	hashPassword = async (password: string): Promise<string> => {
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(password, salt);
			return hashedPassword;
		} catch (error) {
			throw new Error("Error hashing password");
		}
	};

	comparePasswords = async (
		password: string,
		hashedPassword: string
	): Promise<boolean> => {
		try {
			const isMatch = await bcrypt.compare(password, hashedPassword);
			return isMatch;
		} catch (error) {
			throw new Error("Error comparing password");
		}
	};
}
