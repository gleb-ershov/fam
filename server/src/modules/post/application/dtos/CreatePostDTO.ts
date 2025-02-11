import { PostDTO } from "./PostDTO";

export interface CreatePostDTO extends Omit<PostDTO, "id"> {}
