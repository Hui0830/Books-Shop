import {SET_COOKIE, DEL_COOKIE, GET_COOKIE} from './ActionTypes.js';

export const set_cookie = (data) => {
	return {
		type: SET_COOKIE,
		data
	}
};
export const get_cookie = (key) => {
	return {
		type: LOGIN_OUT,
		key: key
	}
}
export const del_cookie = (key) => {
	return {
		type: LOGIN_OUT,
		key: key
	}
}