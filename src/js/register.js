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
	//点击改变复选框样式
	$('.label').children('span').eq(0).click(function(e){
		//阻止冒泡
		e.stopPropagation();
		//console.log($('.label').children('input').is(':checked'));
		//判断复选框是否选中
		if($(this).siblings('input').is(':checked')){
			$(this).addClass('false');
		}
		else{
			$(this).removeClass('false');
		}
	})
	//眼睛状态切换；
	$('.eye').click(function(){
		$(this).toggleClass('switch');
		$(this).prev().toggleClass('pwd');
		if($('#pwd').hasClass('pwd')){
			$('#pwd').attr('type','password');
		}else{
			$('#pwd').attr('type','text');
		}
	});
})
