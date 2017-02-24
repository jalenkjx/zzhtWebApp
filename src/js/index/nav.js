//导航模块
define(['jquery','param','iscroll','index/liveList'],function($,param,IScroll,liveList){
	return {
		livesCatalogues:function(){
			var _this = this;
			$.ajax({
				type:"get",
				url:param.api+"v1/api/livesCatalogue/data?type=2",
				async:false,
				success:function(res){
					console.log(res);
					var len = res.datas.livesCatalogues.length;
					console.log(len);
					$('nav').width(1.6*len+'rem');
					var html = '';
					$.each(res.datas.livesCatalogues, function(key,item) {
						html += '<li class="nav_item" data-id='+item.id+'>'+item.name+'</li>';
					});
					$('nav','.nav_scroll').children('ul').append(html);
					
					_this.load();
				}
			});
		},
		nav_scroll:null,
		
		load:function(){
			var _this = this;
			_this.nav_scroll = new IScroll('.nav_scroll', { 
				scrollX: true, 
				scrollY: false, 
				probeType:3,
				click:true
			});
		}
	}
})
