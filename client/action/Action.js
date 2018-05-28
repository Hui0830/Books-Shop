import * as ActionTypes from './ActionTypes';

import {post,get} from '../until/http.js';

export const fetchStart = () => {
	return {
		type: ActionTypes.FETCH_START
	}
};

export const fetchSuccess = (result) => {
	return {
		type: ActionTypes.FETCH_SUCCESS,
		result
	}
};
export const fetchError = (error) => {
	return {
		type: ActionTypes.FETCH_ERROR,
		error
	}
}

/*-----异步登录操作------*/
export const onLogin = (datas) => {
	return (dispatch) => {
		const apiUrl = '/api/login';

		dispatch(fetchStart);

		post(apiUrl,datas).then((res) => {
			dispatch(fetchSuccess(res));
		})
		.then((resp) => {console.log("push")}).catch((error) => {
			dispatch(fetchError(error));
		})
	}
}
/*-------異步GET-------*/
/*-----异步登录操作------*/
export const getPageData = (datas,pageUrl) => {
	return (dispatch) => {
		const apiUrl = `/api${pageUrl}`;

		dispatch(fetchStart);

		get(apiUrl,datas).then((res) => {
			dispatch(fetchSuccess(res));
		})
		.catch((error) => {
			dispatch(fetchError(error));
		})
	}
}