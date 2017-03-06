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

require(['jquery','param','catalog/goodsList'],function($,param,goodsList){
	goodsList.myScroll;
	var id = getUrlParam('id');
	goodsList.load(id,0);
	//横排显示和竖排显示；
	$('.style').on('click',function(){
		if($('#style').attr('href')=='css/catalog_good/horizontal.css'){
			$('#style').attr('href','css/catalog_good/vertical.css');
		}else{
			$('#style').attr('href','css/catalog_good/horizontal.css');
		}
	})
	
	
	
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null){
			return unescape(r[2]);	
		}

		return null; //返回参数值
	}

})
