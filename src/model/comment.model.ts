import { UserResponse } from "./user.model";

export interface ICommentRequest {
  _id: string; // _id of post or comment
  comment_user: UserResponse;
  comment_text: string;
  emojis?: [];
  comments?: ICommentResponse
}

export interface ICommentResponse {
  _id: string;
  comment_user: UserResponse;
  comment_text: string;
  emojis?: [];
  comments?: ICommentResponse
}