import { USER } from "redux/actions";

const intitalState = {
  socketUser: undefined,
} as any

// selector
export const SelectorSocketUser = (state: any) => state.user.socketUser;

// reducers
export default function userReducer(state = intitalState, action: any) {
  switch(action.type) {
    case USER.SET_SOCKET_USER: 
      return {...state, socketUser: action.socketUser}
    default:
      return state;
  }
}