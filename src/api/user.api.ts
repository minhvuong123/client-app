import { LoginRequest, LoginResponse, RegisterUserRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const reisterUrl = '/users/register';
export const loginUrl = '/users/sign-in';
export const suggestFriendsUrl = '/users/suggest';
export const validateUrl = '/validate';
export const addFriendUrl = '/users/addFriend';
export const refreshUrl = '/users/refresh';
export const uploadAvatarUrl = '/users/upload-avatar';
export const getFriendsUrl = '/users/get-friends';

export const userApi = {
  register: (url: string, originRegisterData: RegisterUserRequest): Promise<any> => {
    return axiosClient.post(url, originRegisterData);
  },
  login: (url: string, originLoginData: LoginRequest): Promise<LoginResponse> => {
    return axiosClient.post(url, originLoginData);
  },
  suggestFriends: (url: string, userId: string, limit: number) => {
    return axiosClient.post(url, { userId, limit });
  },
  validate: (url: string) => {
    return axiosClient.post(url);
  },
  addFriend: (url: string, userId: string, friendId: string) => {
    return axiosClient.post(url, { userId, friendId });
  },
  refresh: (url: string, originRefreshData: any): Promise<any> => {
    return axiosClient.post(url, originRefreshData);
  },
  uploadAvatar: (url: string, originRefreshData: any): Promise<any> => {
    return axiosClient.patch(url, originRefreshData);
  },
  getFriends: (url: string, originFriendsData: any): Promise<any> => {
    return axiosClient.post(url, originFriendsData);
  }
}