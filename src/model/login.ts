export interface LoginRequest {
  email_phone: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}