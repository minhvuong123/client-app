import { UserResponse } from "./user.model";

export interface IGlobalState {
  typingPopup: boolean;
  shared: string;
  conversations: IConversation[];
}

export interface IConversation {
  _id: string;
  name: string;
  members: UserResponse[];
}