import * as ActionTypes from '../action/ActionTypes';

const getPageReducer = (state = {status:'loading'}, action) => {
	switch (action.type) {

		case ActionTypes.FETCH_START:
			return {status: 'loading'};
		case ActionTypes.FETCH_SUCCESS:
			 return {...state,status:'success',...action.result};
		case ActionTypes.FETCH_ERROR:
			 return {...state,status:'error',...action.error};
		default:
		 	return state;
	}
}
export default getPageReducer;