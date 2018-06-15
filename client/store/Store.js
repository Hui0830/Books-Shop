import { createStore,applyMiddleware,combineReducers,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import asyncReducer from '../reducer/getPageReducer';
import loginInOutReducer from '../reducer/loginInOutReducer';
import detailData from '../reducer/detailPageReducer';
import sellerData from '../reducer/sellerPageReducer';
import productData from '../reducer/productPageReducer';
import userInfoData from '../reducer/userHomePageReducer';



const initValues = {
	/*首页reducer*/
	asyncReducer: {
		status:'',	
		goodPerson: {
			type: '',	
			header: "",
			data: []
		},
		goodsilderBooks: {
			type: "",	
			header: "",
			data: [],
		},
		hotBooks:[],
		newBooks:[]
	},
	// 详情页reducer
	detailData: {
		userInfo: {},
		book: {}

	},
	// 卖家个人主页信息
	sellerData: {

		sellerInfo: {},
		sellerBooks: [],
		sellerFans: []
		
	},
	//产品页面
	productData: {
		books: []
	},
	// 用户后台
	userInfoData: {
		userInfo:{},
		myWarehouse: [],
		sellerBooks: [],
	},
	// 登入reducer
	loginInOutReducer: {
		isLogin: false,
		userInfo:{}
	},
	

};
const middlewares = [applyMiddleware(thunkMiddleware)];
// const store = createStore(reducer, initValues, ...middlewares);
const finalCreateStore = compose(...middlewares)(createStore);
const reducers = combineReducers({
	loginInOutReducer,
	asyncReducer,
	detailData,
	sellerData,
	productData,
	userInfoData
})
const store = finalCreateStore(
    reducers,
    initValues
  	
)
export default store;