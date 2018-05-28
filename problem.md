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
#### （四）、框架
1. redux的combineReducers方法，假设有reducer1（signUp）和reducer2（signIn），两个reducer都有action type（'CHANGE_USERNAME'）,你会发现在其中一个view中修改username，另外一个username也会跟着改变，