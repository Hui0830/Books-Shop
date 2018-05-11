import * as ActionTypes from '../action/ActionTypes';

export default (state, action) => {
	const {counterCaption} = action;
	const newState = Object.assign({}, state);


	switch (action.type) {
		case ActionTypes.INCREMENT:
			newState.count[counterCaption] ++;
			return newState;
		case ActionTypes.DECREMENT:
			newState.count[counterCaption] --;
			 return newState;
			 default:
			 	return state
	}
}