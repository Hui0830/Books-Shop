import * as ActionTypes from './ActionTypes';

import {post,get} from '../until/http.js';


export const fetchStart = (prefix) => {
	return {
		type: `${prefix}_${ActionTypes.FETCH_START}`
	}
};

export const fetchSuccess = (prefix,result) => {
	return {
		type: `${prefix}_${ActionTypes.FETCH_SUCCESS}`,
		result
	}
};
export const fetchError = (prefix,error) => {
	return {
		type: `${prefix}_${ActionTypes.FETCH_ERROR}`,
		error
	}
}

/*-----异步获取首页信息操作------*/
export const getPageData = (prefix,datas,pageUrl) => {
	return (dispatch) => {
		const apiUrl = `/api${pageUrl}`;

		dispatch(fetchStart(prefix));
		
		get(apiUrl,datas).then((res) => {
			dispatch(fetchSuccess(prefix,res));
		})
		.catch((error) => {
			console.log(error);
			dispatch(fetchError(prefix,error));
		})
	}
}