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
		'index/domains',
		'index/loadmore'
		],
		function($,param,swiper,nav,banner,liveList,domains,loadmore){
			nav.livesCatalogues();
			banner.bannerImg();
			liveList.live_recommend(0);
			domains.domains();
			loadmore.load();
			
			$('.nav_item').on('click',function(){
				$(this).addClass('act').siblings().removeClass('act');
				$('ul','.live').empty();
				var id = $(this).attr('data-id');
				console.log(id);
				console.log($(this).index());
				if($(this).index()!=0){
					$('.banner').css('display','none');
					$('.iconBox').css('display','none');
					$('.imgNav').css('display','none');
					
				}else{
					$('.banner').css('display','block');
					$('.iconBox').css('display','flex');
					$('.imgNav').css('display','block');
					live.live_recommend(0);
				}
				loadmore.myScroll.refresh();
			})
})
