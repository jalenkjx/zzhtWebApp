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

require(['jquery','addressAjax'],function($){
		
	
	$('.back').on('click',function(e){
		e.stopPropagation();
		window.location.href = "/order.html"
	})

	
	
})
