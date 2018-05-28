import * as ActionTypes from '../action/ActionTypes';

const loginReducer = (state = {status:'loading',isLogin:false}, action) => {
	switch (action.type) {

		case ActionTypes.FETCH_START:
			return {status: 'loading'};
		case ActionTypes.FETCH_SUCCESS:
			 return {...state,status:'success',isLogin:true,...action.result};
		case ActionTypes.FETCH_ERROR:
			 return {...state,status:'error',...action.error};
		default:
		 	return state;
	}
}
export default loginReducer;