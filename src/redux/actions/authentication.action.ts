import { UserResponse } from "model";

export const LOGIN = {
  LOGIN: 'LOGIN',
  SUCCESS: 'LOGIN_SUCCESS',
  FAULT: 'LOGIN_FAULT',
};

export function loginSuccess(token: string, refreshToken: string,  user: UserResponse) {
  return {
    type: LOGIN.SUCCESS,
    token,
    refreshToken,
    user
  }
} 

export function loginFault() {
  return {
    type: LOGIN.FAULT
  }
} 

export const LOGOUT = 'LOGOUT';

export function logout() {
  return {
    type: LOGOUT
  }
} 
