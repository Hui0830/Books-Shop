// 导入http模块
const express=require('express')
const axios =require ('axios')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
/*开启一个监听事件，每次http请求都会触发这个事件*/
/*-----处理图标.icon-----*/
const favicon = require('serve-favicon')
const app = express();
/*开发环境判断*/
const isDev = process.env.NODE_ENV === 'development'
/*需要在服务器渲染之前处理图标*/
app.use(favicon(path.join(__dirname,"../favicon.ico")));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: false}))

if(!isDev){
	console.log(isDev);
	
	app.use('/public',express.static(path.join(__dirname,'../dist')));
	app.get('/',function(req,res, next){
		res.set('Content-Type','text/html')
		fs.readFile(path.join(__dirname,"../resource/index.html"),function(err,data){
			console.log(data)
		res.end(data)
	})

	});
	
}




function getUser(data,key,userId) {
	return data.filter((item,index) => {
		return item[key] == userId
	})
}
function getBook(data,key,bookId) {
	return data.filter((item,index) => {
		return item[key] == bookId
	})
}
/*---------------详细数据-----------------*/
let books = []; //存储书籍信息数据
let userData = [];	//存储总用户数据库
let userCart = []; //个人购物车数据
let goodPerson = [];
let goodsilderBooks = [];
let hotBooks = [];
let newBooks = [];

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
		tel: '1572778'+ i,
		password: '12'+i,
		sex: '男',
		city: '江西',
		school: '江西农业大学',
		fan: i - 999 + Math.floor(Math.random()+1),
		concern: i - 999 + Math.floor(Math.random()+1),
		signature: '怀念不能' + i + '男,江西农业大学',
		carts: [
			{
				id: i,
				img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
				name: '快乐上班的经济学'+i,
				sellId: i,
				price: (i - 900)/5.00,
				oldPrice: i - 900,
				num: i,
				buyNum: i-1,
				totalPrice: (i - 900)/5.00*(i-1)
			},
			{
				id: i+1,
				img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
				name: '快乐上班的经济学'+i,
				sellId: i+1,
				price: (i - 900)/5.00,
				oldPrice: i - 900,
				num: i,
				buyNum: i-1,
				totalPrice: (i - 900)/5.00*(i-1)
			},
		],
		address: [
			{	
				id:i,
				userName: '李文辉',
				tel: '15727785909',
				mailCode:'000000',
				provinces: '江西',
				address: '江西省南昌市江西农业大学南区14栋418'
			},
			{	
				id:i+1,
				userName: '钟兴',
				tel: '15727785909',
				mailCode:'000000',
				provinces: '江西',
				address: '江西省南昌市江西农业大学南区14栋418，江西省南昌市江西农业大学南区14栋418'
			}
		],
		myOrder:[
			{
				bookId: i,
				img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
				name: '快乐上班的经济学'+i,
				OrderId: i,
				price: (i - 900)/5.00,
				oldPrice: i - 900,
				num: i,
				buyNum: i-1,
				status: '未付款'
			},
			{
				bookId: i+1,
				img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
				name: '快乐上班的经济学'+i,
				OrderId: i+1,
				price: (i - 900)/5.00,
				oldPrice: i - 900,
				num: i,
				buyNum: i-1,
				status: '成功'
			},
		],
		sellerOrder: [
			{
				bookId: i,
				img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
				name: '快乐上班的经济学'+i,
				OrderId: i,
				price: (i - 900)/5.00,
				oldPrice: i - 900,
				num: i,
				buyNum: i-1,
				status: '未付款',
				createTime: "2018-5-18",
			},
			{
				bookId: i,
				img: "http://ubookmall.b0.upaiyun.com/book/2018/05/17/1426997285_1526538670.jpg" ,
				name: '快乐上班的经济学'+i,
				OrderId: i,
				price: (i - 900)/5.00,
				oldPrice: i - 900,
				num: i,
				buyNum: i-1,
				status: '未付款',
				createTime: "2018-5-18",
			},
		],
		bankAccount: {
			type: 'alipay',
			account: '15727785909',
			accountName: '怀念不能',
		},
		message: {
			trends: [
				{
					userId: i,
					userName: '怀念不能'+ i,
					avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
					content: "不错，尽快发货" 
				},
				{
					userId: i+1,
					userName: '怀念不能'+ i+1,
					avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
					content: "不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货" 
				}
			],
			seller: [
				{
					userId: i,
					userName: '不能'+ i,
					avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
					content: "不错，尽快发货" 
				},
				{
					userId: i+1,
					userName: '不能'+ i+1,
					avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
					content: "不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货不错，尽快发货" 
				}
			],
		}

	};
	books.push(item);
	userData.push(userItem);
};

/*----------------侧边栏数据----start-----------------*/
/*热门个人展示数据*/
userData.forEach((item,index) => {
	const { id,img,userName,fan } = item;
	if (index <= 10) {
		goodPerson.push({ id,img,name:userName,collect:fan }) 
	}
	
})
/*热门书籍展示数据*/

books.forEach((item,index) => {
	const {id, img, name, collect } = item;
	if (index <=10) {
		goodsilderBooks.push({ id, img, name, collect });
	}
	
})
/*----------------侧边栏数据----end-----------------*/

/*-----------首页数据----start----------*/
const homeBooks = books;
homeBooks.sort((pre,next) => {
	return pre.collect-next.collect
});
homeBooks.forEach((item,index) => {
	const { img,name,id,collect,price,oldPrice,cart} = item;
	if (index < 12) {
		hotBooks.push({ img,name,id,collect,price,oldPrice,cart })
	}
})

/*-----------首页数据----end----------*/


/*个人购物车数据模拟*/
books.forEach((item,index) => {
	const { id,name,sellId,seller,num,oldPrice,price } = item;
	userCart.push({ id,name,sellId,seller,num,oldPrice,price })
})



app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.post('/api/login', function (req, res) {
	const {userName,password} = req.body;
	console.log(userName,String(password))
	const user = getUser(userData,'tel',userName)
	console.log(user)
  	if (user.length > 0 && user[0].password === password) {
  		res.json({
  			success: true,
  			userInfo: user[0]
  				/*id: 20152213,
  				avatar: 'http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big',
  				userName: '怀念不能',
  				tel: '15727785909',
  				sex: '男',
  				city: '江西',
  				school: '江西农业大学',
  				fan: 4 + Math.floor(Math.random()+1),
  				concern: 2 + Math.floor(Math.random()+1),
  				signature: '怀念不能/男,江西农业大学'*/
  			
  		})
  	} else {
  		res.status(403)
  		res.json({
  			success:false,
  			
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
		hotBooks,
		newBooks:books.slice(0,12),
	})
})

// /user 节点接受 PUT 请求
app.get('/api/detail', function (req, res) {
  const bookId = req.query.bookId;
  console.log(bookId);
  const book = getBook(books,'id',bookId)[0];
  const userInfo = getUser(userData,'id',book.sellId)[0];
  res.json({
		success:true,
		userInfo,
		book,
	})
});

// seller卖家信息返回
app.get('/api/seller', function (req, res) {
  	  const sellerId = req.query.sellerId;
	  console.log(sellerId);
	  const sellerInfo = getUser(userData,'id',sellerId)[0];
	  const sellerBooks = getBook(books,'sellId',sellerId);
	 
	  res.json({
			success:true,
			sellerInfo,
			sellerBooks,
		})
});

// /user 节点接受 DELETE 请求
app.get('/api/product', function (req, res) {
  	res.json({
  		success:true,
  		books,
  	})
});
// 用户主页信息请求
app.get('/api/userSet',function(req,res) {
	const userId = req.query.userId;
	const userInfo = getUser(userData,'id',userId)[0];
	const sellerBooks = getBook(books,'sellId',userId);
	console.log(sellerBooks)
	res.json({
		userInfo,
		sellerBooks,
		myWarehouse: sellerBooks
	})
})



app.listen(3333,function(){
	console.log("server is listening in 3333")
});

