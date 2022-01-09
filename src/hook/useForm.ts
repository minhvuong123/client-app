import { useReducer } from "react";

const inititalState = {

}

function reducer(state: any, action: any) {
	const { type, input: { name, value } } = action;

	switch (type) {
		case name:
			return { ...state, [name]: value };
		default:
			return state;
	}
}

export const useHookForm = () => {
	const [state, dispatch] = useReducer(reducer, inititalState);

	function handleChange(event: any) {
    const { name, value } = event.target;

    dispatch({ type: name, input: { name, value } })
  }

	return [state, handleChange]
}