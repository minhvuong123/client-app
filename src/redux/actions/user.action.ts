import { UserResponse } from "model";

export const USER = {
  ADD_USER_PREVIEW: 'ADD_USER_PREVIEW'
};

export function addUserPreview(user: UserResponse) {
  return {
    type: USER.ADD_USER_PREVIEW,
    user
  }
} 
