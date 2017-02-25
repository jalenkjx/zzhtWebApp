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
require(['jquery',
		'param',
		'swiper',
		'index/nav',
		'index/banner',
		'index/liveList',
		'index/domains'
		],
		function($,param,swiper,nav,banner,liveList,domains){
			nav.livesCatalogues();
			banner.bannerImg();
			liveList.live_recommend(0,0);
			domains.domains();
			liveList.load();
			
			$('.nav_item').on('click',function(){
				
				$(this).addClass('act').siblings().removeClass('act');
				$('ul','.live').empty();
				var id = $(this).attr('data-id');
				console.log(id);
				$('.live').attr('data-fl',$(this).html());
				$('.live').attr('data-id',id);
				if($(this).index()!=0){
					$('.banner').css('display','none');
					$('.iconBox').css('display','none');
					$('.imgNav').css('display','none');
					liveList.live_other(id,0,0)
				}else{
					$('.banner').css('display','block');
					$('.iconBox').css('display','flex');
					$('.imgNav').css('display','block');
					liveList.live_recommend(0,0);
				}
				liveList.myScroll.refresh();
			})
})
