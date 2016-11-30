var express = require('express');

var request = require('request');

var bodyParser = require('body-parser');

var app = express();

app.route('/api/login').get(function(req, res){
//	var options = {
//	  url: 'http://192.168.199.127/zzht/oauth/token?device_id=353661060399849&app_version=3.1.3&os_version=9.1&ac=wifi',
//	  method: 'POST',
//	  json: {
//	    "grant_type":"password",
//		"client_id":"302a7d556175264c7e5b326827497349",
//		"client_secret":"4770414c283a20347c7b553650425773",
//		"username":"13623360184",
//		"password":"123456"
//	  }
//	};
//	request.post(options,function(error,response,data){
//		res.send(data);
//	});
	//获取传入的参数
	//var query = req.query;
	//console.log(req.query);
	request.post({
		url:'http://192.168.199.127/zzht/oauth/token?device_id=353661060399849&app_version=3.1.3&os_version=9.1&ac=wifi',
		//url:'http://service.myzhenzhen.com/zzht/oauth/token?device_id=353661060399849&app_version=3.1.3&os_version=9.1&ac=wifi', 
		form: req.query
//			{
//				"grant_type":"password",
//				"client_id":"302a7d556175264c7e5b326827497349",
//				"client_secret":"4770414c283a20347c7b553650425773",
//				"username":"13623360184",
//				"password":"123456"
//			}
	},function(err,httpResponse,body){ 
		res.send(body);	
	})
});
app.route('/api/userInfo').get(function(req,res){
	console.log(req.query);

	requset.post({
		url:'http://192.168.199.127/zzht/v1/api/users/getUserByLoginName?device_id=353661060399849&app_version=3.1.3&os_version=9.1&ac=wifi',
		form:req.query//,
//		headers:{
//			'Content-Type': 'application/x-www-form-urlencoded',
//			'Authorization': 'Bearer c96d6765-2cc8-4e26-bdbb-d8d81f9a347c'
//		}
	},function(err,httpResponse,body){
		//console.log(body);
		res.send(body);
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
server.listen(80, "0.0.0.0", function() {
	console.log('http://127.0.0.1:80');
});