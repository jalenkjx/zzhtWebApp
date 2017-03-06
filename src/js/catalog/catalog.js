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

require(['jquery','catalog/catalogdata'],function($,catalog){
	catalog.load();
	var id = $('#catalog_L').children(':first').attr('data-id');
	catalog.sub_Load(id);
	$('#catalog_L').children().on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).attr('data-id');
		catalog.sub_Load(id);
		$('dl').on('click',function(){
			var g_id = $(this).attr('data-id');
			location.href = './catalog_good.html?id='+g_id;
		});
	});
	
	$('dl').on('click',function(){
		var id = $(this).attr('data-id');
		location.href = './catalog_good.html?id='+id;
	});
})
