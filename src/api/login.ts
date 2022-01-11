import { LoginRequest, LoginResponse } from "model";
import { axiosClient } from "./axiosClient";

export const loginUrl = '/users/sign-in';

export const loginApi = {
  login: (url: string, originLoginData: LoginRequest): Promise<LoginResponse> => {
    return axiosClient.post(url, originLoginData);
  }
}