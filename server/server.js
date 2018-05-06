// 导入http模块
var http = require('http')

/*开启一个监听事件，每次http请求都会触发这个事件*/
var server = http.createServer(function(req, res){
	

	// 设置响应头信息
	res.writeHead(200, {
		"Content-type": "text/html",
		"charset": "utf-8"
	});

	//设置响应体
	res.write("服务开启");

	//结束事件
	res.end("<meta charset='utf-8'><div>jjjfj觉得开发荒废了</div>");


});

/*-------开启服务，监听端口-----------*/
server.listen(3333,function() {
	console.log("服务开启，监听端口3333~")
})
