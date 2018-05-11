import { createStore } from 'redux';

import reducer from '../reducer/counterReducer';

const initValues = {
	user: {
		isLogin: false,
		userInfo: {
			userId: '0',
			userName: '怀念不能',
			tel: '15727785909',
			password: '',
			avatar: '',
			sex: '男',
			school: '江西农业大学',
			city: '江西赣州'
		}
	},
	count: {
		'first': 0,
		'second': 10,
		'third': 20
	}
	

};

const store = createStore(reducer, initValues);

export default store;