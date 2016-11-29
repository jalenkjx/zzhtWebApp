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

require(['jquery'],function($){
	
	//支付方式选择
	$('li','.pay_method').click(function(e){
		e.stopPropagation();
		$(this).addClass('active').siblings('li').removeClass('active');
	})
})
