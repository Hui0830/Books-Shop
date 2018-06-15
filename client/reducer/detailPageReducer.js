import generateReducer from './generateReducer.js';

const addState = {status:'loading'}
const getPageReducer = generateReducer('detailPage',addState);

export default getPageReducer;