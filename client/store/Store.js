import { createStore } from 'redux';

import reducer from '../reducer/counterReducer';
import bookImg from '../public/images/logo.png';

/*-------数据模拟--------*/


/*---------------详细数据-----------------*/
let books = []; //存储书籍信息数据
let userData = [];	//存储总用户数据库

/*------------silder数据-----------*/
let goodPersonData = []; //存储热门个人数据

let goodsilderBooks = [];	//存储热门书籍数据

let userCart = [] //个人购物车数据
for (let i = 0; i < 4; i++) {
  userCart.push({
    key: i,
    bookName: `深入react 技术栈 ${i}`,
    sellName: `怀念不能${i}`,
    bookNum: `${i}`,
    beforePrice: `￥ ${i}`,
    afterPrice: `￥ ${i}`,
    totalPrice: `￥ ${i}`
  });
};
/*循环生成数据*/
for(let i = 1000; i < 1060; i++) {

	/*书籍*/
	const item = {
		id: i,
		img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
		name: '快乐上班的经济学'+i,
		sellId: i,
		seller: {
			img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			userName: '怀念不能' + i,
			sex: '男',
			school: '江西农业大学',

		},
		price: (i - 900)/5.00,
		oldPrice: i - 900,
		collect: i,
		createTime: "2018-5-18",
		cover: 'user',
		imges: [],
		num: 1,
		cart:6,
		news: '七成新',
		category: '经济管理',
		author: '新文出版社/李晟',
		describe: '《快乐上班的经济学》是一本非他视角、即站在消费者的视角了解身边的商品价格及服务的经济学入门书籍。《快乐上班的经济学》为我们揭开经济规律面纱的经济学是一门十分有趣的学问，而且时常还能帮助我们防止一些在工作中遇到的意想不到的失败。也就是说，虽然经济学是一门既有趣又实用的学问，但许多年轻人在没有学习它的基础上就开始了工作，因而非常容易被经济活动中的惊涛骇浪所吞没。',
		comment: [
			{userName: "笔试"+i,userId: i,content: "不错"},
			{userName: "笔试"+i,userId: i,content: "不错"},
			{userName: "笔试"+i,userId: i,content: "不错"},
			{userName: "笔试"+i,userId: i,content: "不错"}
		]
	};
	books.push(item);

	/*用户数据库*/
	const userItem = {
		id: i,
		avatar: 'user',
		userName: '怀念不能' + i,
		sex: '男',
		city: '江西',
		school: '江西农业大学',
		fan: i - 999 + Math.floor(Math.random()+1),
		concern: i - 999 + Math.floor(Math.random()+1)
	};
	userData.push(userItem);

	/*热门个人展示数据*/
	const silderPersonItem = {
		id: i,
		img: bookImg ,
		name: '怀念不能' + i,
		collect: i
	};
	goodPersonData.push(silderPersonItem);

	/*热门书籍展示数据*/
	const silderBookItem = {
		id: i,
		img: bookImg ,
		name: '快乐上班的经济学',
		collect: i
	};
	goodsilderBooks.push(silderBookItem);



};



/*-----------热门个人数据模拟-------------*/

const initValues = {
	userData: userData,
	user: {
		isLogin: false,
		userInfo: {
			userId: '0',
			userName: '怀念不能',
			tel: '15727785909',
			password: '',
			avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
			sex: '男',
			school: '江西农业大学',
			city: '江西赣州'
		}
	},
	count: {
		'first': 0,
		'second': 10,
		'third': 20
	},
	goodPerson: {
		type: 'hotPerson',	
		header: "热门个人",
		data: goodPersonData
	},
	goodsilderBooks: {
		type: "hotBook",	
		header: "热销书籍",
		data: goodsilderBooks,
	}, 
	bookInfo: {
		books: books
	},
	userCart:userCart,

};

const store = createStore(reducer, initValues);

export default store;