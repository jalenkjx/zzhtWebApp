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
	
	
	//选中状态
	$('li').click(function(e){
		e.stopPropagation();
		$(this).addClass('checked').siblings('li').removeClass('checked');
	})
	
	$('a','li').click(function(e){
		e.stopPropagation();
		var i = $(this).parents('li').index();
		$('li').eq(i).remove();
	})
})
