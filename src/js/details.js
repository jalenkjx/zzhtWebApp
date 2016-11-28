require([
			'jquery',//jquery依赖
			'rem',//设计稿处理
			'swiper',
			'detailAjax'
			],
			function($,Rem,Swiper){
				$(function(){
					new Swiper ('.swiper-container', {
					    direction: 'horizontal',
					    autoplay: 2500,
					    // 分页器
					    pagination: '.swiper-pagination',
					    autoplayDisableOnInteraction:false,
					  })        
				})
			})