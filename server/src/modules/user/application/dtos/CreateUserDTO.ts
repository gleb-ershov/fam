import { UserDTO } from "./UserDTO";

export interface CreateUserDTO
	extends Omit<UserDTO, "id" | "bio" | "image_url"> {
	hashedPassword: string;
}
