//根据分类id获取直播列表模块
define(['jquery','param','swiper'],function($,param){
	return {
		live_recommend:function(num){
			var _this = this;
			$.ajax({
				type:"get",
				url:param.api+'v1/api/live/lives?start='+num, 				
				async:false,
				success:function(res){
					console.log(res);
					_this.callback(res);
				}
			})
		},
		live_other:function(id){
			var _this = this;
			$.ajax({
				type:"get",
				url:param.api+"v1/api/live/lives/"+id+'?app_version=1.9.13',
				 				
				async:false,
				success:function(res){
					_this.callback(res);
				}
			});
		},
		callback:function(res){
			$.each(res.datas,function(key,item){
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
				var html = '';
				html = '<li class="live_item" data-id="'+item.liveId+'">'+
							'<span class="liveIcon">'+item.audienceCount+'</span>'+
							'<span class="location">'+item.address+'</span>'+
							'<div class="userInfo">'+
								'<div class="headicon"><img src="'+icon+'" alt="" /></div>'+
								'<div class="nickname">'+item.userDTO.nickname+'</div>'+
								'<div class="live_title">'+item.subject+'</div>'+
							'</div>'+
							'<div class="goodsbox" id="goodsbox">'+
								'<div id="goods_scroll'+key+'" class="goods_scroll swiper-container">'+
									'<div class="swiper-wrapper" style="display:flex">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</li>';
				$('ul','.live').append(html);
				//封面图
				$('.live_item').eq(key).css('background','url('+param.imgLink+item.coverImagePath+') no-repeat');
				$('.live_item').css('background-size','7.5rem')
//						console.log(item.goods.length);
				//直播商品
				//商品个数不同宽度也不同
				if(item.goods.length<8){
					var str = '';
					for(var i = 0;i<item.goods.length;i++){
						str += 	'<div class="swiper-slide goodsInfo">'+
										'<div class="goodImg"><img src="'+param.imgLink+item.goods[i].goodsImages[0].imgName+'" alt="" /></div>'+
										'<div class="good_detail">'+
											'<div class="goodname">'+item.goods[i].name+'</div>'+
											'<div class="goodprice">￥'+item.goods[i].actualPrice+'</div>'+
										'</div>'+
									'</div>';			
					}
					$('.swiper-wrapper','#goods_scroll'+key).html(str);
					if(item.goods.length==1){
						new Swiper('#goods_scroll'+key,{
							slidesPerView: 1.5,//2.7、2.1、1.5
		        			spaceBetween: 10
						});
					}else if(item.goods.length==2){
						new Swiper('#goods_scroll'+key,{
							slidesPerView:2.1,
							spaceBetween: 10
						})
					}else{
						new Swiper('#goods_scroll'+key,{
							slidesPerView:2.7,
							spaceBetween: 10
						})
					}
				}else{
					var str1 = '';
					for(var i = 0 ; i<8 ; i++){
						str1 +=	'<div class="swiper-slide goodsInfo">'+
									'<div class="goodImg"><img src="'+param.imgLink+item.goods[i].goodsImages[0].imgName+'" alt="" /></div>'+
									'<div class="good_detail">'+
										'<div class="goodname">'+item.goods[i].name+'</div>'+
										'<div class="goodprice">￥'+item.goods[i].actualPrice+'</div>'+
									'</div>'+
								'</div>';
					}
					$('.swiper-wrapper','#goods_scroll'+key).html(str1);
					var str2 = '<div class="swiper-slide more"><img src="http://og20zwqwb.bkt.clouddn.com/goods_more.png" alt="" style="height:1rem; width:auto;"/></div>'
					$('.swiper-wrapper','#goods_scroll'+key).append(str2);
					new Swiper('#goods_scroll'+key,{
						slidesPerView:2.7,
						spaceBetween: 10
					});
				}
				
				
			})
		}
	}
})
