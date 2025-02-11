import { UserDTO } from "./UserDTO";

export interface UpdateUserDTO extends Omit<Partial<UserDTO>, "id"> {
	password: string;
}
