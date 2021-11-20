import { LOGIN, LOGOUT } from "redux/actions/authentication.action";

const authentication = {
  isLogin: false,
  access_token: ''
}

export default function authenticationReducer(state = authentication, action: any) {
  switch(action.type) {
    case LOGIN.SUCCESS: 
      state.access_token = action.token;
      return {...state}
    case LOGOUT: 
      state.access_token = '';
      return {...state}
    default:
      return state;
  }
}