import { UserResponse } from "model";
import { LOGIN, LOGOUT } from "redux/actions/authentication.action";

const authentication = {
  isLogin: false,
  access_token: '',
  refreshToken: '',
  user: {} as UserResponse
}

// selector
export const SelectorIsLogin = (state: any) => state.authentication.isLogin; 
export const SelectorAccessToken = (state: any) => state.authentication.access_token; 
export const SelectorAccessUser = (state: any) => state.authentication.user; 

// reducers
export default function authenticationReducer(state = authentication, action: any) {
  switch(action.type) {
    case LOGIN.LOGIN: 
      state.isLogin = false;
      return {...state}
    case LOGIN.SUCCESS: 
      const { token, refreshToken, user } = action;
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("refreshToken", refreshToken);
      state.access_token = token;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isLogin = true;
      return {...state}
    case LOGOUT: 
      state.access_token = '';
      state.refreshToken = '';
      state.user = {} as UserResponse;
      state.isLogin = false;
      return {...state}
    case LOGIN.UPDATE_AVATAR_USER: 
      state.user.avatar = action.imageUrl;
      localStorage.setItem("user", JSON.stringify(state.user));
      return {...state}
    case LOGIN.UPDATE_BACKGROUND_USER: 
      state.user.background_image = action.imageUrl;
      localStorage.setItem("user", JSON.stringify(state.user));
      return {...state, user: {...state.user}}
    default:
      return state;
  }
}