import generateReducer from './generateReducer.js';

const addState = {status:'loading'}
const getPageReducer = generateReducer('userPage',addState);

export default getPageReducer;