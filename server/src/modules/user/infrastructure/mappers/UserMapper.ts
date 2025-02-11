import { Types } from "mongoose";
import { EntityID } from "../../../../shared/value-objects/EntityID";
import { User } from "../../domain/entities/User";
import { IUserDocument } from "../schemas/UserSchema";
import { UserDTO } from "../../application/dtos/UserDTO";

export class UserMapper {
	static toEntity(userDocument: IUserDocument): User {
		if (!userDocument) {
			throw new Error("Invalid user document");
		}

		const userData = {
			name: userDocument.name,
			email: userDocument.email,
			username: userDocument.username,
			birth_date: userDocument.birth_date,
			hashedPassword: userDocument.hashedPassword,
			image_url: userDocument.image_url,
			bio: userDocument.bio,
		};

		return new User(userData, new EntityID(userDocument._id.toString()));
	}

	static toDatabase(user: User): Partial<IUserDocument> {
		return {
			_id: new Types.ObjectId(user.getId()),
			name: user.getName(),
			email: user.getEmail(),
			username: user.getUsername(),
			birth_date: user.getBirthdate(),
			hashedPassword: user.getHashedPassword(),
			image_url: user.getImageUrl(),
			bio: user.getBio(),
		};
	}

	static toDTO(user: User): UserDTO {
		return {
			id: user.getId() || "",
			name: user.getBio(),
			email: user.getBio(),
			username: user.getBio(),
			birth_date: user.getBio(),
			image_url: user.getBio(),
			bio: user.getBio(),
		};
	}
}
