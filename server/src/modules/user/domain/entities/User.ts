import { UserEntity } from "../interfaces/UserEntity";
import { EntityID } from "../../../../shared/value-objects/EntityID";

export type TUser = {
	name: string;
	email: string;
	username: string;
	birth_date: string;
	hashedPassword: string;
	image_url?: string;
	bio?: string;
};

export class User implements UserEntity {
	private _id?: EntityID;
	private name: string;
	private email: string;
	private username: string;
	private birth_date: string;
	private hashedPassword: string;
	private image_url?: string;
	private bio?: string;

	constructor(data: TUser, _id?: EntityID) {
		const { name, email, username, birth_date, hashedPassword } = data;
		this._id = _id;
		this.name = name;
		this.email = email;
		this.username = username;
		this.birth_date = birth_date;
		this.hashedPassword = hashedPassword;
	}

	public getId(): string | undefined {
		return this._id?.id;
	}

	public getEmail(): string {
		return this.email;
	}

	public getName(): string {
		return this.name;
	}

	public getUsername(): string {
		return this.username;
	}

	public getBirthdate(): string {
		return this.birth_date;
	}

	public getHashedPassword(): string {
		return this.hashedPassword;
	}

	public getImageUrl(): string {
		return this.image_url || "";
	}

	public getBio(): string {
		return this.bio || "";
	}

	static create(data: TUser): User {
		return new User(data);
	}

	static update(data: TUser, _id: string): User {
		const entityId = new EntityID(_id);
		return new User(data, entityId);
	}
}
