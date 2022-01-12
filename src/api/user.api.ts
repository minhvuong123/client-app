import { LoginRequest, LoginResponse, RegisterUserRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const reisterUrl = '/users/register';
export const loginUrl = '/users/sign-in';
export const suggestFriendsUrl = '/users/suggest';
export const validateUrl = '/validate';

export const userApi = {
  register: (url: string, originRegisterData: RegisterUserRequest): Promise<any> => {
    return axiosClient.post(url, originRegisterData);
  },
  login: (url: string, originLoginData: LoginRequest): Promise<LoginResponse> => {
    return axiosClient.post(url, originLoginData);
  },
  suggestFriends: (url: string, userId: string) => {
    return axiosClient.post(url, { limit: 20, userId });
  },
  validate: (url: string) => {
    return axiosClient.post(url);
  }
}