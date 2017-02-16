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

require(['jquery','orderAjax'],function($,CreateOrder){
	
	//订单页的商品信息
		//从localstorage里获取图片地址
	CreateOrder.init();
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
	
	
	var goods_id = window.localStorage.getItem('goods_id');
	//点击收货人跳转用户地址列表页；
	$('.consignee').eq(0).click(function(){
		window.location.href = "./address.html";
	})
	$('.back').on('click',function(e){
		e.stopPropagation();
		window.location.href="./details.html?goods_id="+goods_id;
	})
})
