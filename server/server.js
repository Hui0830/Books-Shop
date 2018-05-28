// 导入http模块
const express=require('express')
const axios =require ('axios')
const bodyParser = require('body-parser')
/*开启一个监听事件，每次http请求都会触发这个事件*/

const app = express();
const baseUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'



/*---------------详细数据-----------------*/
let books = []; //存储书籍信息数据
let userData = [];	//存储总用户数据库
let userCart = []; //个人购物车数据
let goodPerson = [];
let goodsilderBooks = [];

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
		num: i,
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
	
	const userItem = {
		id: i,
		avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
		userName: '怀念不能' + i,
		tel: '15727785909',
		password: '123456',
		sex: '男',
		city: '江西',
		school: '江西农业大学',
		fan: i - 999 + Math.floor(Math.random()+1),
		concern: i - 999 + Math.floor(Math.random()+1),
		signature: '怀念不能' + i + '男,江西农业大学'
	};
	books.push(item);
	userData.push(userItem);
};

/*----------------侧边栏数据----start-----------------*/
/*热门个人展示数据*/
userData.forEach((item,index) => {
	const { id,img,userName,fan } = item;
	goodPerson.push({ id,img,name:userName,collect:fan }) 
})
/*热门书籍展示数据*/

books.forEach((item,index) => {
	const {id, img, name, collect } = item;
	goodsilderBooks.push({ id, img, name, collect });
})
/*----------------侧边栏数据----end-----------------*/


/*个人购物车数据模拟*/
books.forEach((item,index) => {
	const { id,name,sellId,seller,num,oldPrice,price } = item;
	userCart.push({ id,name,sellId,seller,num,oldPrice,price })
})


const initValues = {
	/*网络异步状态*/
	status:'loading',
	isLogin: false,
	goodPerson: {
		type: 'hotPerson',	
		header: "热门个人",
		data: goodPerson
	},
	goodsilderBooks: {
		type: "hotBook",	
		header: "热销书籍",
		data: goodsilderBooks,
	},
	userData, 
	books,
	userCart,
	isLogin: false,

};



// 对网站首页的访问返回 "Hello World!" 字样
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: false}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.post('/api/login', function (req, res) {
	const body = req.body;
  	if (req.body.userName === '15727785909' && req.body.password === '123456') {
  		res.json({
  			success: true,
  			userInfo: {
  				id: 20152213,
  				avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
  				userName: '怀念不能',
  				tel: '15727785909',
  				sex: '男',
  				city: '江西',
  				school: '江西农业大学',
  				fan: 4 + Math.floor(Math.random()+1),
  				concern: 2 + Math.floor(Math.random()+1),
  				signature: '怀念不能/男,江西农业大学'
  			}
  		})
  	} else {
  		res.json({
  			success:false,
  			body,
  			data: 'error'
  		})
  	}
});
app.get('/api/index',function(req,res) {
	res.json({
		success:true,
		goodPerson: {
			type: 'hotPerson',	
			header: "热门个人",
			data: goodPerson
		},
		goodsilderBooks: {
			type: "hotBook",	
			header: "热销书籍",
			data: goodsilderBooks,
		},
		userData, 
		books,
	})
})

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
app.listen(3333,function(){
	console.log("server is listening in 3333")
});