//轮播图模块
define(['jquery','param','swiper'],function($,param){
	return {
		bannerImg:function(){
			$.ajax({
				type:"get",
				url:param.api+"v1/api/domain/get_banners",
				async:false,
				success:function(res){
//					console.log(res);
					$.each(res.datas,function(key,item){
						var bannerHtml 	= 	'<div class="swiper-slide"><img src="'+item.imgSrc+'" alt="" /></div>';
						$('.swiper-wrapper','.banner').append(bannerHtml);
					})
					new Swiper ('.swiper01', {
					    direction	: 'horizontal',
					    autoplay	: 2500,
					    // 分页器
					    pagination	: '.swiper-pagination',
	    				autoplayDisableOnInteraction:false,
				  	}) 
				}
			});
		}
	}
})
