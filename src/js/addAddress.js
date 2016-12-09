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
require(['jquery','LAreaData1','LArea','addAjax'],function($,LAreaData1,LArea){
	window.location.reload;
	//地市选择三级联动
	var area = new LArea();
		area.init({
		    'trigger': '#choose',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
		    'valueTo':'#value1',//选择完毕后id属性输出到该位置
		    'keys':{id:'id',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
		    'type':1,//数据源类型
		    'data':LAreaData//数据源
	});
	//改变复选框样式
	$('.label').click(function(e){
		//阻止冒泡
		e.stopPropagation();
		//console.log($('.label').children('input').is(':checked'));
		//判断复选框是否选中
		if($(this).children('input').is(':checked')){
			$(this).removeClass('false');
			//$(this).addClass('false');
		}
		else{
			//$(this).removeClass('false');
			$(this).addClass('false');
		}
	})
	//返回按钮的页面跳转
	$('.back').on('click',function(e){
		e.stopPropagation();
		window.location.href = "./address.html";
	})

})
