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
  password: string;
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