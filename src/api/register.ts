import { RegisterUserRequest, RegisterUserResponse } from "model";
import { axiosClient } from "./axiosClient";

export const reisterUrl = '/users/register';

export const registerApi = {
  register: (url: string, originRegisterData: RegisterUserRequest): Promise<any> => {
    return axiosClient.post(url, originRegisterData);
  }
}