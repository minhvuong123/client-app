import { UserResponse } from "model";

export const LOGIN = {
  LOGIN: 'LOGIN',
  SUCCESS: 'LOGIN_SUCCESS',
  FAULT: 'LOGIN_FAULT',
  UPDATE_AVATAR_USER: 'UPDATE_AVATAR_USER',
  UPDATE_BACKGROUND_USER: 'UPDATE_BACKGROUND_USER',
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

export function updateAvatarUrl(imageUrl: string) {
  return {
    type: LOGIN.UPDATE_AVATAR_USER,
    imageUrl
  }
} 

export function updateBackgroundUrl(imageUrl: string) {
  return {
    type: LOGIN.UPDATE_BACKGROUND_USER,
    imageUrl
  }
} 

export const LOGOUT = 'LOGOUT';

export function logout() {
  return {
    type: LOGOUT
  }
} 
