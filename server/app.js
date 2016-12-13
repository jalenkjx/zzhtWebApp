var express = require('express');

var request = require('request');

var bodyParser = require('body-parser');

var app = express();
//登录获取token跨域
app.route('/api/login').get(function(req, res){

	//console.log(req.query);
	request.post({
		url:'http://192.168.199.127/zzht/oauth/token?device_id=353661060399849&app_version=3.1.3&os_version=9.1&ac=wifi',
		//url:'http://service.myzhenzhen.com/zzht/oauth/token?device_id=353661060399849&app_version=3.1.3&os_version=9.1&ac=wifi', 
		form: req.query
	},function(err,httpResponse,body){ 
		res.send(body);	
	})
});
//获取商品详情跨域
app.route('/api/details').get(function(req,res){
	console.log(req.query);
	console.log(req.query.goodsId);
	request.get({
		url:"http://192.168.199.127/zzht/v1/api/shop/goods/"+req.query.goodsId,
		form:req.query
	},function(err,resp,body){
		res.send(body)
	})
})

app.use(bodyParser.urlencoded({    
extended: true
}));

// express 开启静态服务器，把指定的目录做跟目录
app.use(express.static("./dest"));

//创建一个 http 服务
var server  = require('http').createServer(app);
//监听端口和 ip 地址
//0.0.0.0 本机网卡
server.listen(8000, "0.0.0.0", function() {
	console.log('http://127.0.0.1:8000');
});