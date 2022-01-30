import { USER } from "redux/actions/user.action";


const user = {
  userPreview: {}
}

// selector
export const SelectorUserPreview = (state: any) => state.user.userPreview; 

// reducers
export default function userReducer(state = user, action: any) {
  switch(action.type) {
    case USER.ADD_USER_PREVIEW: 
      state.userPreview = action.user;
      return {...state}
    default:
      return state;
  }
}