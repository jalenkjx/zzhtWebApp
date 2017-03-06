//根据分类id获取直播列表模块
define(['jquery','param','swiper','iscroll'],function($,param,Swiper,IScroll){
	return {
		//推荐和国家馆直播列表
		live_recommend:function(num,count,country){
			if($('#pullUp-msg').html()=='已经到底了'){
				return;
			}
			var _this = this;
			$.ajax({
				type:"get",
				url:param.api+'v1/api/live/lives?start='+num+'&country='+country, 				
				async:false,
				success:function(res){
//					console.log(res);
					_this.callback(res,count);
				}
			})
		},
		//最新接口
		live_new:function(num,count){
			var _this = this;
			if($('#pullUp-msg').html()=='已经到底了'){
				return;
			}
			$.ajax({
				type:'get',
				url:param.api+'v1/api/live/new/lives?start='+num,
				async:false,
				success:function(res){
					_this.callback(res,count);
				}
			})
		},
		//国家馆接口
		live_country:function(){
			var _this = this;
			$.ajax({
				type:"get",
				url:param.api+'v1/api/live/countrys',
				async:false,
				success:function(res){
					console.log(res);
					//国家馆banner
					$('.imgban').children('img').attr('src',param.imgLink+res.datas[0].countryImg);
					var html = '';
					for(var i = 1; i<res.datas.length; i++){
						html += '<li class="countryItem" data-val="'+res.datas[i].countryValue+'"><img src="'+param.imgLink+res.datas[i].countryImg+'" alt="" /></li>'
					}
					$('.countryList').html(html);
				}
			})
		},
		//根据id获取直播列表
		live_other:function(id,num,count){
			if($('#pullUp-msg').html()=='已经到底了'){
				return;
			}
			var _this = this;
			$.ajax({
				type:"get",
				url:param.api+"v1/api/live/lives/"+id+'?app_version='+param.app_version+'&start='+num,	
				async:false,
				success:function(res){
					_this.callback(res,count);
				}
			});
		},
		callback:function(res,count){
//			console.log(res);
			
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
				html = '<li class="live_item liveLi'+count+key+'" style="background:url('+param.imgLink+item.coverImagePath+') no-repeat" data-id="'+item.liveId+'">'+
							'<span class="liveIcon">'+item.audienceCount+'</span>'+
							'<span class="location">'+item.address+'</span>'+
							'<div class="userInfo">'+
								'<div class="headicon"><img src="'+icon+'" alt="" /></div>'+
								'<div class="nickname">'+item.userDTO.nickname+'</div>'+
								'<div class="live_title">'+item.subject+'</div>'+
							'</div>'+
							'<div class="goodsbox" id="goodsbox">'+
								'<div id="goods_scroll'+count+key+'" class="goods_scroll swiper-container">'+
									'<div class="swiper-wrapper" style="display:flex">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</li>';
				$('ul','.live').append(html);
				if(item.isVod==0){
//					console.log($('.liveLi'+count+key).children().eq(0))
					$('.liveLi'+count+key).children().eq(0).css({
						'background-image':'url(http://og20zwqwb.bkt.clouddn.com/liveicon.png)',
						'background-color':'#f13b51'
					});
					
				}
				//封面图
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
					$('.swiper-wrapper','#goods_scroll'+count+key).html(str);
					if(item.goods.length==1){
						new Swiper('#goods_scroll'+count+key,{
							slidesPerView: 1.5,//2.7、2.1、1.5
		        			spaceBetween: 10
						});
					}else if(item.goods.length==2){
						new Swiper('#goods_scroll'+count+key,{
							slidesPerView:2.1,
							spaceBetween: 10
						})
					}else{
						new Swiper('#goods_scroll'+count+key,{
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
					$('.swiper-wrapper','#goods_scroll'+count+key).html(str1);
					var str2 = '<div class="swiper-slide more"><img src="http://og20zwqwb.bkt.clouddn.com/goods_more.png" alt="" style="height:1rem; width:auto;"/></div>'
					$('.swiper-wrapper','#goods_scroll'+count+key).append(str2);
					new Swiper('#goods_scroll'+count+key,{
						slidesPerView:2.7,
						spaceBetween: 10
					});
				}
				
				
			})
			if(res.datas.length<20){
				$('#pullUp-msg').html('已经到底了');
				return;
			}
		},
		myScroll:null,
		load: function(){
			var _this = this;
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, _this.isPassive() ? {
				capture: false,
				passive: false
			} : false);
		   _this. myScroll = new IScroll('#scroll', { probeType: 3, scrollY:true, click:true});
		   	var _this = this;
			var start = 0;
			var count = 0;
		   	_this. myScroll.on("scrollEnd",function(){
	   			var that = this;
	        	var y = this.y;
	           	var maxY = this.maxScrollY;
	           	var dist = this.distY;
	            if(y==maxY&&dist<-200){
	            	count++;
	            	start += 20;
	            	var id = $('.live').attr('data-id');
	            	//推荐
	            	if(id == '12345'){
	            		_this.live_recommend(start,count,'all');
	            		
	            	//国家馆
	            	}else if(id == '54321'){
	            		if($('.live').css('display')!='none'){
	            			var countryVal = $('.live').attr('data-val');
	            			_this.live_recommend(start,count,countryVal);
	            		}
	            	//最新	
	            	}else if(id=='22222'){
	            		_this.live_recommend(start,count);
	            	}else{
	            		_this.live_other(id,start,count);
	            	}
	            	this.refresh();
	            }
           	})
		},
		isPassive:function(){
			var supportsPassiveOption = false;
		    try {
		        addEventListener("test", null, Object.defineProperty({}, 'passive', {
		            get: function () {
		                supportsPassiveOption = true;
		            }
		        }));
		    } catch(e) {}
		    return supportsPassiveOption;
		}
		
	}
})
