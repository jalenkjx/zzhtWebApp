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
			function($,Swiper,detailAjax){
				
				detailAjax.init();
//				$('#mask').css('width',$(document).width());
//				$('#mask').css('height',$(document).height());
				$('.popUp').css('display','none');
				$(function(){
					var maskHeight = $(window).height();
					//增加购买数量
					var flag = 0;
					$('.plus').eq(0).click(function(){
						var num = $('.num').eq(0).val();
						var inventory = parseInt($('i','.stock').html());
						if(num >= inventory){
							$('.alert').eq(0).children('p').html('已达到库存上限')
//							$('#mask').css('display','block');
//							flag = 1;
							$('.alert').css('display','block');
							$('.alert_sure').on('click',function(){
								$('.alert').css('display','none');
//								$('#mask').css('display','none');
//								flag = 0;
							})
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
//							alert('最少购买一件');
							$('.alert').eq(0).children('p').html('最少购买一件')
							$('.alert').css('display','block');
//							$('#mask').css('display','block');
//							flag = 1;
							$('.alert_sure').on('click',function(){
								$('.alert').css('display','none');
//								$('#mask').css('display','none');
//								flag = 0;
							})
							num = 1;
							$('.num').eq(0).val(num);
						}else{
							num--;
							$('.num').eq(0).val(num);
						}
					})
					
					//点击按钮，规格弹窗消失
					$('.close').on('click',function(e){
						e = e || window.event;  
					    if(e.stopPropagation) { 
					        e.stopPropagation();  
					    } else {  
					        e.cancelBubble = true;  
					    } 
						document.getElementsByClassName('popUp')[0].style.display='none';
						document.getElementsByClassName('mask')[0].style.height='0';
						flag = 0;
//						$('.popUp').css('display','none');
//						$('.mask').css('height','0');
						 
					})
					//点击    请选择规格，下单，显示规格弹窗；
					$('.standard').on('click',function(e){
						e = e || window.event;  
					    if(e.stopPropagation) { 
					        e.stopPropagation();  
					    } else {  
					        e.cancelBubble = true;  
					    } 
						//e.stopPropagation();
						fadeIn();	
					})
					$('#order').on('click',function(e){
						e = e || window.event;  
					    if(e.stopPropagation) { 
					        e.stopPropagation();  
					    } else {  
					        e.cancelBubble = true;  
					    } 
						fadeIn();
					})
					  //遮罩层,弹窗出现
					
				  	function fadeIn(){
				  		 
				  		document.getElementsByClassName('popUp')[0].style.display='block';
				  		//$('.popUp').css('display','block');
				  		document.getElementsByClassName('mask')[0].style.height=maskHeight+'px';
						//$('.mask').css('height',maskHeight);
						flag = 1;
				  	}
				  	
				  	
				  	document.addEventListener('touchmove', function (event) {
						if(flag == 1){
							event.preventDefault();
						}
					})
				  	//商品信息和购买说明tab切换
				  	$('.goodTab').children('li').click(function(){
				  		$(this).addClass('active').siblings().removeClass('active');
				  		console.log($(this).index());
				  		if($(this).index()==0){
				  			$('.description').css('display','none');
				  			$('.info').css('display','block');
				  		}else{
				  			$('.info').css('display','none');
				  			$('.description').css('display','block');
				  		}
				  	})
					
				})
				
				
			})