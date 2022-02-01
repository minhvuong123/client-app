import { IGlobalState } from "model/globalState.model";


// global action
export const GLOBAL_STATE_SET_TYPING_POPUP = 'GLOBAL_STATE_SET_TYPING_POPUP';
export const GLOBAL_STATE_SET_RAIDO_SHARED = 'GLOBAL_STATE_SET_RAIDO_SHARED';

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
// global action

// store and dispatch
export const inititalState: IGlobalState = {
	typingPopup: true, 
	shared: 'only-self'
}

export function globalReducer(state: IGlobalState, action: any) {
	switch (action.type) {
		case GLOBAL_STATE_SET_TYPING_POPUP:
			return { ...state, typingPopup: action.typing };
		case GLOBAL_STATE_SET_RAIDO_SHARED:
			return { ...state, shared: action.value };
		default:
			return state;
	}
}
// store and dispatch