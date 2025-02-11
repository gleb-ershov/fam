import mongoose, { Document, Schema, Types } from "mongoose";
import { TUser } from "../../domain/entities/User";

const userSchema = new Schema<TUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		birth_date: {
			type: String,
			required: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		image_url: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("User", userSchema);
export interface IUserDocument extends TUser, Document {
	_id: Types.ObjectId;
}
export default UserModel;
