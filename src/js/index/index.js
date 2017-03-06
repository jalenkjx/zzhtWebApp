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
			liveList.live_recommend(0,0,'all');
			domains.domains();
			liveList.load();
			var countryFlag = 0;
			
			
			//导航点击事件
			$('.nav_item').on('click',function(){
				
				
				$(this).addClass('act').siblings().removeClass('act');
				$('ul','.live').empty();
				var id = $(this).attr('data-id');
				console.log(id);
//				$('.live').attr('data-fl',$(this).html());
				$('.live').attr('data-id',id);
				if($(this).index()==0){
					$('.banner').css('display','block');
					$('.iconBox').css('display','flex');
					$('.imgNav').css('display','block');
				}else{
					$('.banner').css('display','none');
					$('.iconBox').css('display','none');
					$('.imgNav').css('display','none');
				}
				//12345 推荐
				if($(this).attr('data-id')=='12345'){
					$('.country').css('display','none');
					$('#scroller-pullUp').css('display','block');
					liveList.live_recommend(0,0,'all');
					liveList.myScroll.scrollToElement(document.querySelector('.banner'));
					
				//22222 最新
				}else if($(this).attr('data-id')=='22222'){
					$('.country').css('display','none');
					$('#scroller-pullUp').css('display','block');
					liveList.live_new(0,0);
					liveList.myScroll.scrollToElement(document.querySelector('.live li:nth-child(1)'));
				//54321 国家馆
				}else if($(this).attr('data-id')=='54321'){
					$('.country').css('display','block');
					$('#scroller-pullUp').css('display','none');
					liveList.live_country();
				}else{
					$('.country').css('display','none');
					$('#scroller-pullUp').css('display','block');
					liveList.live_other(id,0,0);
					liveList.myScroll.scrollToElement(document.querySelector('.live li:nth-child(1)'));
					
				}
				liveList.myScroll.refresh();
			
				//国家馆点击
				$('.countryItem').on('click',function(){
					console.log('111');
					$('.live').css('display','block');
					$('#scroller-pullUp').css('display','block');
					$('.live').attr('data-val',$(this).attr('data-val'));
					var countryVal = $(this).attr('data-val');
					$('.country').css('display','none');
					liveList.live_recommend(0,0,countryVal);
					liveList.myScroll.refresh();
				})
			});
			
			
			
			
})
