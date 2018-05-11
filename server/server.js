// 导入http模块
const express=require('express')
const axios =require ('axios')
/*开启一个监听事件，每次http请求都会触发这个事件*/

const app = express();
const baseUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'
app.use('/*',function(req, res) {
	axios.get(baseUrl)
		.then(function(respones){
			res.send(respones)
		})
		.catch(function(err) {
			console.log(err)
		})
})
app.listen(3330,function(){
	console.log("server is listening in 3333")
});