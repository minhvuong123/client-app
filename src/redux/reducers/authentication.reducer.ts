import { LOGIN, LOGOUT } from "redux/actions/authentication.action";

const authentication = {
  isLogin: false,
  access_token: '',
  refreshToken: '',
  user: {},
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
      state.access_token = action.token;
      state.refreshToken = action.refreshToken;
      state.user = action.user;
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