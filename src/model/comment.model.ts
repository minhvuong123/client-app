import { UserResponse } from "./user.model";

export interface ICommentResponse {
  comment_user: UserResponse;
  comment_text: string;
  emojis?: [];
  comments?: ICommentResponse
}