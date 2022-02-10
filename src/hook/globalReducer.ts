import { IConversation, IGlobalState } from "model/globalState.model";

// global action
export const GLOBAL_STATE_SET_TYPING_POPUP = 'GLOBAL_STATE_SET_TYPING_POPUP';
export const GLOBAL_STATE_SET_RAIDO_SHARED = 'GLOBAL_STATE_SET_RAIDO_SHARED';
export const GLOBAL_STATE_SET_CONVERSATION = 'GLOBAL_STATE_SET_CONVERSATION';
export const GLOBAL_STATE_REMOVE_CONVERSATION = 'GLOBAL_STATE_REMOVE_CONVERSATION';
export const setTypingPopup = (typing: boolean) => {
	return { 
		type: GLOBAL_STATE_SET_TYPING_POPUP,
		typing
	}
}

export const setRadioShared = (value: string) => {
	return { 
		type: GLOBAL_STATE_SET_RAIDO_SHARED,
		value
	}
}

export const setConversation = (conversation: IConversation) => {
	return { 
		type: GLOBAL_STATE_SET_CONVERSATION,
		conversation
	}
}

export const removeConversation = (conversationId: string) => {
	return { 
		type: GLOBAL_STATE_REMOVE_CONVERSATION,
		conversationId
	}
}
// global action

// store and dispatch
export const inititalState: IGlobalState = {
	typingPopup: true, 
	shared: 'only-self',
	conversations: [] as IConversation[]
}

export function globalReducer(state: IGlobalState, action: any) {
	switch (action.type) {
		case GLOBAL_STATE_SET_TYPING_POPUP:
			return { ...state, typingPopup: action.typing };
		case GLOBAL_STATE_SET_RAIDO_SHARED:
			return { ...state, shared: action.value };
		case GLOBAL_STATE_SET_CONVERSATION:
			return { ...state, conversations: [...state.conversations, action.conversation] };
		case GLOBAL_STATE_REMOVE_CONVERSATION:
			state.conversations = state.conversations.filter((conversation: IConversation) => conversation._id !== action.conversationId);
			return { ...state, conversations: [...state.conversations] };
		default:
			return state;
	}
}
// store and dispatch