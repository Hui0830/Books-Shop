import generateReducer from './generateReducer.js';

const addState = {status:'loading'}
const getPageReducer = generateReducer('sellerPage',addState);

export default getPageReducer;