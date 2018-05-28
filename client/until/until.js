export function isArray(value) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(value)
	} else {
		return Object.prototype.toString.call(value) === '[object Array]';	
	}
}