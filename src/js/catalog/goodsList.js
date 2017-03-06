define(['jquery','param','iscroll'],function($,param,IScroll){
	return{
		myScroll:new IScroll('#scroll', { probeType: 3, scrollY:true, click:true}),
		load:function(id,num){
			var _this = this;
//			_this.myScroll = new IScroll('#scroll', { probeType: 3, scrollY:true, click:true});
			$.ajax({
				type:"get",
				url:param.api+"v1/api/shop/goods/catalog/"+id+"?sort=0&start="+num+"&amount=20",
				async:false,
				success:function(res){
					console.log(res);
					var html = '';
					$.each(res.datas.goodsList, function(key,item) {
						var icon ='';
						if(item.userDTO.icon){
							icon = item.userDTO.icon;
							if(icon.indexOf('http')>-1){
								icon = icon;
							}else{
								icon = param.imgLink+icon;
							}
						}else{
							icon = 'http://o7oo0fyx1.bkt.clouddn.com/default_icon.png';
						}
						html+=	
							'<li>'+
								'<div class="imgbox">'+
									'<img src="'+param.imgLink+item.goodsImages[2].imgName+'" alt="" />'+
								'</div>'+
								'<div class="info">'+
									'<div class="goodname">'+item.name+'</div>'+
									'<div class="price">￥'+item.actualPrice+'</div>'+
								'</div>'+
								
								'<div class="sellerbox">'+
									'<div class="country">'+
										'<span class="countryIcon"><img src="'+item.countryIcon+'" alt="" /></span>'+
										'<p class="countryName">'+item.countryName+'</p>'+
									'</div>'+
									'<div class="seller">'+
										'<span class="sellerIcon"><img src="'+icon+'" alt="" /></span>'+
										'<p class="sellerName">'+item.nickname+'</p>'+
									'</div>'+
								'</div>'+
							'</li>'
					});
					$('ul','#scroller').append(html);
					_this.myScroll.refresh();
				}
			});
		}
	}
})