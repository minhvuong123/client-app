import { IFile } from "./file.model";

export interface RegisterModel {
  onCloseRegister: React.MouseEventHandler<any>;
}

export interface RegisterUserRequest {
  first_name: string;
  last_name: string;
  email_phone: string;
  password: string;
  day_birth?: string;
  month_birth?: string;
  year_birth?: string;
  birthday?: string;
}

export interface UserResponse {
  _id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  background_image: string;
  user_name: string;
  email_phone: string;
  birthday: string;
  background_color: string;
  createdAt: string;
}

export interface LoginRequest {
  email_phone: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  user: any;
}

export interface ILoginSuccess {
  token: string;
  refreshToken: string;
  user: UserResponse;
}

export interface IImage {
  _id: string;
  images_user_id: string;
  images_url: string;
  createdAt: string;
}

export interface IMessage {
  _id?: string;
  conversationId?: string;
  sender?: UserResponse;
  senderId?: string;
  text?: string;
  images?: IFile[];
}