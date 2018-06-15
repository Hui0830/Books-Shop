import generateReducer from './generateReducer.js';

const addState = {status:'loading'}
const getPageReducer = generateReducer('productPage',addState);

export default getPageReducer;