var winWidth = window.innerWidth;
var fontSize = winWidth/750*100;
var html = document.documentElement;
html.style.fontSize = fontSize + "px";
window.onresize = function(){
	var winWidth = window.innerWidth;
	var fontSize = winWidth/750*100;
	var html = document.documentElement;
	html.style.fontSize = fontSize + "px";
}

require(['jquery','param'],function($){
	
	//var api = 'http://192.168.199.127/zzht/';
	//var api = 'http://zhenzhen.s1.natapp.cc/zzht/';
	//var api = 'http://service.myzhenzhen.com/zzht/';
	//var imgLink = 'http://o6uda1nl0.bkt.clouddn.com/';//内网
	//var imgLink = 'http://7xrr05.com1.z0.glb.clouddn.com/';//外网
	var liveId = getUrlParam('liveId');
	var userId = getUrlParam('userId');
	$.ajax({
		type:"get",
		url:api+"v1/api/live/"+liveId+"?userId="+userId,
		success:function(res){
			//console.log(res.datas.goods)
			console.log(res);
			var data = res.datas.goods;
			$.each(data, function(i) {
				var html = '<li data-id="'+data[i].goodsId+'">'+
								'<div class="imgbox"><img src="'+imgLink+data[i].goodsImages[2].imgName+'" alt="" /></div>'+
								'<div class="goodsInfo">'+
									'<p class="name">'+data[i].name+'</p>'+
									'<div class="p_btn">'+
										'<p class="price">￥'+data[i].price+'</p>'+
										'<button>立即购买</button>'+
									'</div>'+
								'</div>'+
							'</li>'
				$('#list').append(html);
			});
			//传递goods——id；
			$('li','#list').on('click',function(){
				console.log($(this).attr('data-id'));
				var goods_id = $(this).attr('data-id');
				window.location.href = './details.html?goods_id='+goods_id
				
			});
		}//success
	});//ajax
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null)
		return unescape(r[2]);
		return null; //返回参数值
	}

});
