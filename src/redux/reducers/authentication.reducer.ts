import { LOGIN, LOGOUT } from "redux/actions/authentication.action";

const authentication = {
  isLogin: false,
  access_token: ''
}

// selector
export const SelectorIsLogin = (state: any) => state.authentication.isLogin; 
export const SelectorAccessToken = (state: any) => state.authentication.access_token; 

// reducers
export default function authenticationReducer(state = authentication, action: any) {
  switch(action.type) {
    case LOGIN.LOGIN: 
      state.isLogin = false;
      return {...state}
    case LOGIN.SUCCESS: 
      state.access_token = action.token;
      state.isLogin = true;
      return {...state}
    case LOGOUT: 
      state.access_token = '';
      state.isLogin = false;
      return {...state}
    default:
      return state;
  }
}