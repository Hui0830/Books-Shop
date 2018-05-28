import axios from 'axios'

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
				if (data && data.success === true) {
					resolve(data)
				} else {
					reject(data)
				}
			}).catch(reject)
	})
}

export const post = (url, datas) => {
	return new Promise((resolve, reject) => {

		axios.post (baseUrl+url, datas)
			.then(resp => {
				const data = resp.data;
				if (data && data.success === true) {
					resolve(data)
				} else {
					reject(data)
				}
			}).catch(reject)
	})
}