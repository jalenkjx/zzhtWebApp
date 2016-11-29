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

require([
			'jquery',//jquery依赖
			//'rem',//设计稿处理
			'swiper',
			'detailAjax'
			],
			function($,Swiper){
				
				$(function(){
					//增加购买数量
					$('.plus').eq(0).click(function(){
						var num = $('.num').eq(0).val();
						var inventory = parseInt($('i','.stock').html());
						if(num >= inventory){
							alert('已达到库存上限');
							num = inventory;
							$('.num').eq(0).val(num);
						}else{
							num++;
							$('.num').eq(0).val(num);
						}
					})
					//减少购买数量
					$('.minus').eq(0).click(function(){
						var num = $('.num').eq(0).val();
						if(num<=1){
							alert('最少购买一件');
							num = 1;
							$('.num').eq(0).val(num);
						}else{
							num--;
							$('.num').eq(0).val(num);
						}
					})
					//点击按钮，规格弹窗消失
					$('.close').click(function(e){
						e.stopPropagation();
						$('.popUp').animate().fadeOut();
						$('.mask').css('height','0');
						 
					})
					//点击    请选择规格，下单，显示规格弹窗；
					$('.standard').click(function(e){
						e.stopPropagation();
						fadeIn();	
					})
					$('a','.order').click(function(e){
						e.stopPropagation();
						fadeIn();
					})
					  //遮罩层,弹窗出现
					var maskHeight = $(window).height();
				  	function fadeIn(){
				  		$('.popUp').animate().fadeIn();
						
						$('.mask').css('height',maskHeight);
				  	}
				  	
				  	//商品信息和购买说明tab切换
				  	$('.goodTab').children('li').click(function(){
				  		$(this).addClass('active').siblings().removeClass('active');
				  		if($(this).index()==0){
				  			$('.description').toggle();
				  			$('.info').toggle();
				  		}else{
				  			$('.info').toggle();
				  			$('.description').toggle();
				  		}
				  	})
					
				})
				
				
			})