####（一）、路由
1. 路由子路由可选匹配，`/path(/:id)`无法匹配到`/path`;
2. 路由二级路由匹配出错,匹配`/userSet/changepwd`时刷新页面，出现无法加载js文件问题，即原本加载路径为`/js/name.js`,在此路由下刷新加载路径变为了`userSet/js/name.js`
#### （二）、语法
1. 剩余参数结构对象报错，对于ES6中的剩余参数只能解构数组：
	```
	const a = [1,2,3,4,5,6];
	let arr = [2,3,...a];
	// 无法剩余解构
	const obj = {
		firstName: "li",
		lastName: "wen"
	}
	let obj1 = {
		home: "江西",
		...obj 			//报错，需插件
	}
	```
- 解决方案
	- 安装一个babel插件`babel-plugin-transform-object-rest-spread`

2. es6静态属性设置报错
	```
	export default class App extends Component {
		static contextTypes = {
			store: PropTypes.object //报错
		}
		constructor(props) {
			super(props)

			this.state = {
				listData: this.context.store.books.slice(0,12),
				isVertical: true
			}

			this.getArray = this.getArray.bind(this);
		}
		render() {
			....more
		}
	```
	- 原因：因为ES6明确规定，Class内部只有静态方法，没有静态属性；所以设置静态方法只能通过`App.contextTypes={}`.
	- 解决路径：[babel官网](https://babeljs.cn/docs/plugins/preset-stage-2/)
	- 解决方案：ES7有一个静态属性的提案，目前Babel转码器支持。安装babel-preset-stage-0 包含了0-3的stage，可根据需要添加，不同的stage封装了不同的插件;
		- 安装：`npm install --save-dev babel-preset-stage-2`;
		- 配置.babelrc：`"presets": ["stage-2"]`
#### （三）、环境构建
1. React(react-router4.0)按需加载：
	- 插件：`babel-plugin-syntax-dynamic-import + react-loadable`;
	
#### （四）、框架
1. redux的combineReducers方法，假设有reducer1（signUp）和reducer2（signIn），两个reducer都有action type（'CHANGE_USERNAME'）,你会发现在其中一个view中修改username，另外一个username也会跟着改变:
	- eg(每个页面的异步获取数据，复用actionType)
	```
	//actionTypes.js
	export const FETCH_START = 'FETCH_START';
	export const FETCH_SUCCESS = 'FETCH_SUCCESS';
	export const FETCH_ERROR = 'FETCH_ERROR';
	```
	- action.js
	```
	export const fetchStart = () => {
		return {
			type: ActionTypes.FETCH_START
		}
	};

	export const fetchSuccess = (result) => {
		return {
			type: ActionTypes.FETCH_SUCCESS,
			result
		}
	};
	export const fetchError = (error) => {
		return {
			type: ActionTypes.FETCH_ERROR,
			error
		}
	}
	<!-- 异步action -->

	```
	- reducer.js
	```
	<!-- loginReducer -->
	const loginReducer = (state = {status:'loading',isLogin:false}, action) {
		switch (action.type) {

			case FETCH_START:
				return {...state,status: 'loading'};
			case FETCH_SUCCESS:
				 return {...state,status:'success',...action.result};
			case FETCH_ERROR:
				 return {...state,status:'error',...action.error};
			default:
			 	return state;
		}
	}
	<!-- getPageReducer -->
	const getPageReducer = (state = {status:'loading'), action) {
		switch (action.type) {

			case FETCH_START:
				return {...state,status: 'loading'};
			case FETCH_SUCCESS:
				 return {...state,status:'success',...action.result};
			case FETCH_ERROR:
				 return {...state,status:'error',...action.error};
			default:
			 	return state;
		}
	}
	```
	- 问题: 1、当不同模块dispatch相应的action时，两个Reducer都会处理这个action，然后两个模块的数据会发生重复和相互修改；
	- 原因：1、在一个应用中，不同模块间的actionType必须唯一，不然一个action的派发可能引起多个reducer的处理；
	- 解决：1、通过给actionType添加不同的前缀使其唯一化，并定义一个通用的reducer生成函数，使其复用化：
	```
	<!-- t通用异步获取数据redux模块 -->
		//actionTypes.js
	export const FETCH_START = 'FETCH_START';
	export const FETCH_SUCCESS = 'FETCH_SUCCESS';
	export const FETCH_ERROR = 'FETCH_ERROR';

	// action.js
	import * as ActionTypes from './ActionTypes';

	import {post,get} from '../until/http.js';

	export const fetchStart = (prefix) => {
		return {
			type: `${prefix}_${ActionTypes.FETCH_START}`
		}
	};

	export const fetchSuccess = (prefix,result) => {
		return {
			type: `${prefix}_${ActionTypes.FETCH_SUCCESS}`,
			result
		}
	};
	export const fetchError = (prefix,error) => {
		return {
			type: `${prefix}_${ActionTypes.FETCH_ERROR}`,
			error
		}
	}

	/*-----异步登录操作------*/
	export const onLogin = (prefix,datas) => {
		return (dispatch) => {
			const apiUrl = '/api/login';

			dispatch(fetchStart(prefix));

			post(apiUrl,datas).then((res) => {
				dispatch(fetchSuccess(prefix,res));
			})
			.then((resp) => {console.log("push")}).catch((error) => {
				dispatch(fetchError(prefix,error));
			})
		}
	}
	/*-----异步登录操作------*/
	export const getPageData = (prefix,datas,pageUrl) => {
		return (dispatch) => {
			const apiUrl = `/api${pageUrl}`;

			dispatch(fetchStart(prefix));

			get(apiUrl,datas).then((res) => {
				dispatch(fetchSuccess(prefix,res));
			})
			.catch((error) => {
				dispatch(fetchError(prefix,error));
			})
		}
	}
	// reducer生成函数
	function generateReducer(prefix,addState) {
		const  FETCH_START = `${prefix}_FETCH_START`;
		const  FETCH_SUCCESS = `${prefix}_FETCH_SUCCESS`;
		const  FETCH_ERROR = `${prefix}_FETCH_ERROR`;
		const initialState = {...addState}
		return function reducer (state = initialState, action) {
			switch (action.type) {

				case FETCH_START:
					return {...state,status: 'loading'};
				case FETCH_SUCCESS:
					 return {...state,status:'success',...action.result};
				case FETCH_ERROR:
					 return {...state,status:'error',...action.error};
				default:
				 	return state;
			}
		}
	}
	export default generateReducer;
	<!-- getPageReducer.js -->
	//定义不同模块的Reducer异步操作时传入唯一前缀
	import * as ActionTypes from '../action/ActionTypes';
	import generateReducer from './generateReducer.js';

	const addState = {status:'loading'}
	const getPageReducer = generateReducer('homePage',addState);

	export default getPageReducer;

	<!-- dispatch派发使用，传入需要出发模块的对应前缀 -->
	如：dispatch(onLogin('loginPage',datas))
	```
2. redux管理路由react-router4.0+react-router-redux使用方式；
	- 问题：查询react-router-redux使用方式配置失败；
	- 解决方案：react-router-redux+react-router4.0官方文档
		- [配置文档](https://github.com/react-translate-team/react-router-CN/tree/master/packages/react-router-redux)
	- 使用方式：
	```
	import React from 'react'
	import ReactDOM from 'react-dom'

	import { createStore, combineReducers, applyMiddleware } from 'redux'
	import { Provider } from 'react-redux'

	import createHistory from 'history/createBrowserHistory'
	import { Route } from 'react-router'

	import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

	import reducers from './reducers' // Or wherever you keep your reducers

	// Create a history of your choosing (we're using a browser history in this case)
	const history = createHistory()

	// Build the middleware for intercepting and dispatching navigation actions
	const middleware = routerMiddleware(history)

	// Add the reducer to your store on the `router` key
	// Also apply our middleware for navigating
	const store = createStore(
	  combineReducers({
	    ...reducers,
	    router: routerReducer
	  }),
	  applyMiddleware(middleware)
	)

	// Now you can dispatch navigation actions from anywhere!
	// store.dispatch(push('/foo'))

	ReactDOM.render(
	  <Provider store={store}>
	    { /* ConnectedRouter will use the store from Provider automatically */ }
	    <ConnectedRouter history={history}>
	      <div>
	        <Route exact path="/" component={Home}/>
	        <Route path="/about" component={About}/>
	        <Route path="/topics" component={Topics}/>
	      </div>
	    </ConnectedRouter>
	  </Provider>,
	  document.getElementById('root')
	)
	- 报错：
	- invariant.js?d8db:42 Uncaught Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

	```

#### (五)、逻辑
1、登入判断