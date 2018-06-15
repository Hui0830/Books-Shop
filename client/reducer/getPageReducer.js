
import generateReducer from './generateReducer.js';

const addState = {status:'loading'}
const getPageReducer = generateReducer('homePage',addState);

export default getPageReducer;