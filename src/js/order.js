//rem
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

require(['jquery','orderAjax'],function($){
	//支付方式选择
	$('li','.pay_method').click(function(e){
		e.stopPropagation();
		$(this).addClass('active').siblings('li').removeClass('active');
	});
	//订单页的商品信息
		//从localstorage里获取图片地址
	var imgurl = window.localStorage.getItem('imgurl');
	$('img','.imgbox').attr('src',imgurl);
		//从localstorage里获取商品名称；
	var goodname = window.localStorage.getItem('goodname');
	$('h3','.order_detail').html(goodname);
		//从localstorage里获取商品数量
	var buynum = window.localStorage.getItem('buyNum');
	$('.price').children('b').children('i').html(buynum);
		//从localstorage里获取商品单价
	var unitprice = window.localStorage.getItem('unitprice');
	$('.price').children('span').html(unitprice);
		//从localstorage里获取运费
	var cost = window.localStorage.getItem('expressCost');
	$('.cost').children('p').children('span').html(cost);
	//点击收货人跳转用户地址列表页；
	$('.consignee').eq(0).click(function(){
		window.location.href = "/address.html";
	})
})
