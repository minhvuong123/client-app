import { LOGIN, LOGOUT } from "redux/actions/authentication.action";

const authentication = {
  isLogin: false,
  access_token: '',
  refreshToken: '',
  user: {}
}

// selector
export const SelectorIsLogin = (state: any) => state.authentication.isLogin; 
export const SelectorAccessToken = (state: any) => state.authentication.access_token; 
export const SelectorAccessUser = (state: any) => state.authentication.user; 
export const SelectorAccessUserPreview = (state: any) => state.authentication.userPreview; 

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
      state.user = {};
      state.isLogin = false;
      return {...state}
    default:
      return state;
  }
}