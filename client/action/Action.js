import * as ActionTypes from './ActionTypes';

export const increment = (counterCaption) => {
	return {
		type: ActionTypes.INCREMENT,
		counterCaption: counterCaption
	}
};

export const decrement = (counterCaption) => {
	return {
		type: ActionTypes.DECREMENT,
		counterCaption: counterCaption
	}
}

/*获取首页商品数据*/
export const getArray = (num) => {
	return {
		type: ActionTypes.GETARRAY,
		num: num
	}
}