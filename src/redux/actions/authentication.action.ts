
export const LOGIN = {
  LOGIN: 'LOGIN',
  SUCCESS: 'LOGIN_SUCCESS',
  FAULT: 'LOGIN_FAULT',
};

export function loginSuccess(token: string) {
  return {
    type: LOGIN.SUCCESS,
    token
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
