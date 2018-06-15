import {LOGIN_IN, LOGIN_OUT} from '../action/ActionTypes';

const  FETCH_START = 'login_FETCH_START';
const  FETCH_SUCCESS = 'login_FETCH_SUCCESS';
const  FETCH_ERROR = 'login_FETCH_ERROR';
const isLogin = (state={isLogin:false},action) => {

	switch (action.type) {
		case LOGIN_IN:
			return {...state,isLogin:true}
		case LOGIN_OUT:
			return {...state,isLogin:false}
		case FETCH_START:
			return {...state,status: 'loading'};
		case FETCH_SUCCESS:
			const userInfo = action.result.data
			return {...state,status:'success',userInfo};
		case FETCH_ERROR:
			 return {...state,status:'error',...action.error};
		default:
			return state
	}
}
export default isLogin