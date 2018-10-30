import axios from 'axios'
import { login_in,login_out } from '../action/loginAction.js';
import {fetchStart,fetchSuccess,fetchError} from '../action/Action.js';
import store from '../store/Store.js';


const baseUrl = process.env.API_BASE || 'http://localhost:3333';


const parseUrl = (url, params) => {
	params = params || {}
	const str = Object.keys(params).reduce((result, key) => {
		result += `${key}=${params[key]}&`;
		return result
	},'')

	return `${baseUrl}${url}?${str.substr(0, str.length-1)}`
}

export const get = (url, params) => {
	return new Promise((resolve, reject) => {
		axios.get(parseUrl(url, params))
			.then(resp => {
				const data = resp.data;
				if (data && data.success) {
					resolve(data)
				} else {
					reject(data)
				}
			}).catch(reject)
	})
}

export const post = (url, datas) => {
	return new Promise((resolve, reject) => {

		axios.post (parseUrl(url, datas))
			.then(resp => {
				const data = resp.data;
				if (data && data.msg === '成功') {
					resolve(data)
				} else {
					reject(data)
				}
			}).catch(reject)
	})
}

/*登入post*/
export const loginPost = (url, datas) => {
	return new Promise((resolve, reject) => {
		store.dispatch(fetchStart('login'))
		axios.post (parseUrl(url, datas))
			.then(resp => {
				const data = resp.data;
				if (data && data.code === 0) {
					store.dispatch(login_in());

					store.dispatch(fetchSuccess('login',data));
					resolve(data);
				} else {
					store.dispatch(login_out());
					store.dispatch(fetchError('login',data))
					reject(data)
				}
			}).catch((err) => {
				store.dispatch(login_out());
				store.dispatch(fetchError('login',err))
				reject(err)
			})
	})
}