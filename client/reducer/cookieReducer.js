import {SET_COOKIE, DEL_COOKIE, GET_COOKIE} from './ActionTypes.js';
import cookie from '../until/cookie.js';

const userId = cookie.get('id');
const cookieReducer = (state={userId:userId},action) => {
	switch (action.type) {

		case SET_COOKIE:
			
			return {...state,isLogin:true}

		case GET_COOKIE:
			return {...state,isLogin:false}

		case DEL_COOKIE:
			return {...state,status: 'loading'};

		default:
			return state
	}
}
export default cookieReducer