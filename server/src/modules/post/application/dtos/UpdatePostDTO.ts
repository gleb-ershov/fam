import { PostDTO } from "./PostDTO";

export interface UpdatePostDTO extends Omit<Partial<PostDTO>, "id"> {}
