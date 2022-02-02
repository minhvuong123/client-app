import { ICommentResponse } from "./comment.model";
import { UserResponse } from "./user.model";

export interface IPostRequest {
  post_user: UserResponse;
  post_shared: string;
  post_text: string;
  post_emoji?: any
  post_comments?: any
}

export interface IPostResponse {
  _id: string;
  post_user: UserResponse;
  post_shared: string;
  post_text: string;
  post_comments: ICommentResponse[];
  post_emoji?: any
}

export interface IEmoji {
  _id: string;
  emoji_user: UserResponse;
  emoji_type: string;
}