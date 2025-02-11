import mongoose, { Document, Schema, Types } from "mongoose";
import { TPost } from "../../domain/entities/Post";

const postSchema = new Schema<TPost>(
	{
		authorId: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		media_urls: {
			type: Array<String>,
		},
	},
	{
		timestamps: true,
	}
);

const PostModel = mongoose.model("Post", postSchema);
export interface IPostDocument extends TPost, Document {
	_id: Types.ObjectId;
}
export default PostModel;
