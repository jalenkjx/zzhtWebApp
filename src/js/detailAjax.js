define(['jquery','swiper','param'],function($){
	var goodDetail = {
		init:function(){
			var _this = this;
			//判断是否为微信浏览器 
			if(_this.is_weixin()){
				//获取openid
				_this.getOpenId();
			}
			_this.getGoodDetail();
			$('#createOrder').on('click',function(e){
				e.stopPropagation();
				//存储商品id
				var goodid = _this.getUrlParam('goods_id');
				window.localStorage.setItem("goods_id",goodid);
				//存储购买数量
				window.localStorage.setItem("buyNum",$('.num').val())
				
				var token = window.localStorage.getItem('access_token');
				var phone = window.localStorage.getItem('phone');
				//判断是否登陆
				if(token&&phone){
					//
					_this.getUserId(token,phone);
				}else{
					window.location.href = "./phoneCheck.html";
				}
			})
		},
		getUrlParam:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			if (r != null)
			return unescape(r[2]);
			return null; //返回参数值
		},
		is_weixin:function(){
			var ua = navigator.userAgent.toLowerCase();
	        if(ua.match(/MicroMessenger/i)=="micromessenger") {
	                return true;
	        } else {
	                return false;
	        }
		},
		getOpenId:function(){
			var _this = this;
			var code  = _this.getUrlParam('code');
			$.ajax({
				type	:	"get",
				url		:	api+'v1/api/weixin/getOpenId?code='+code,
				async	:	false,
				success	:	function(res){
					var datas 		= 	res.datas;
					var headimgurl 	= 	datas.headimgurl;
					var openid 		= 	datas.openid;
					var nickname 	= 	datas.nickname;
					//存储openid；
					window.localStorage.setItem('openid',openid);
					alert('openid---'+openid);
				}
			});
		},
		//获取用户id
		getUserId:function(token,phone){
			var _this = this;
			$.ajax({
				type	: 	"post",
						
				url		: 	api+"v1/api/users/getUserByLoginName", 
				data	:	{
					  			'loginName':phone,
					  			'thirdType':' '
							},
				headers : 	{
								'Authorization': 'Bearer '+token,
								'Content-Type': 'application/x-www-form-urlencoded'
							},
				complete:	function(res){_this.getUserIdCallback(res) }
			})
		},
		getUserIdCallback:function(res){
//			console.log(res.status);
			if(res.status==200){
			      	//获取用户的登录信息
				var buyerInfo = JSON.parse(res.responseJSON.user);
//				console.log(buyerInfo);
				//存储买家id
				window.localStorage.setItem('userId',buyerInfo.userId);
				window.location.href = './order.html';
			}else{
				window.location.href = "./phoneCheck.html";
			}
		},
		//获取商品详情
		getGoodDetail:function(){
			var _this  = this;
			var goodid = _this.getUrlParam('goods_id');
			$.ajax({
				type 	: 'get',
				url  	: api+'v1/api/shop/goods/'+goodid,
				async	: false,
				success	: function(res){_this.goodDetailCallback(res)}
			})
		},
		//商品详情回调
		goodDetailCallback:function(res){
			var data = res.datas;
			//动态创建轮播图
			for(var i = 0; i<data.goodsImages.length/3; i++){
				var imgIndex 	= 	3*i+2;
				var bannerHtml 	= 	'<div class="swiper-slide"><img src="" alt="" /></div>'
				
				$('.swiper-wrapper').append(bannerHtml);
				$('img','.swiper-slide').eq(i).attr('src',imgLink+data.goodsImages[imgIndex].imgName);
			}
			//轮播图js
			new Swiper ('.swiper-container', {
					    direction	: 'horizontal',
					    autoplay	: 2500,
					    // 分页器
					    pagination	: '.swiper-pagination',
	    				autoplayDisableOnInteraction:false,
					  }) 
			//保存商品运费
			window.localStorage.setItem('expressCost',data.expressCost);
			//保存卖家id
			window.localStorage.setItem('sellerId',data.userDTO.userId);
			//商品价格(默认设置第一种规格价格)
			$('.goodPriceInt').html(data.goodsSizes[0].price);
			//商品名称
			var nameHtml = '<span>'+data.name+'</span>';
			$('.goodName').html(nameHtml);
			window.localStorage.setItem('goodname',data.name);
			//推荐语
			var recommend = '<span>'+data.recommend+'</span>';
			$('.signature').html(recommend);
			//国家图标
			var countryIcon = '<img src="'+data.countryIcon+'" style="width:100%;"/>'
			$('.flag').eq(0).html(countryIcon);
			//国家名称
			$('.country').html(data.countryName);
			//发货地
			$('.address').html(data.address);
			//预计到货时间
			$('span','.arriveTime').html(data.arrivalDays);
			//卖家头像
			var url = data.userDTO.icon;

			if(url.indexOf('http')>-1){
				url = url;

			}else{
				url = imgLink+url;

			}
			//console.log(url);
			$('.userIcon').css('background-image','url('+url+')');
			
			//卖家昵称
			$('.userName').html(data.userDTO.nickname);
			//卖家地址
			$('span','.userAddress').html(data.userDTO.address);
			//卖家全部商品
			$('.goodNumber').html(data.userDTO.goods_number);
			//粉丝人数
			$('.fans').html(data.userDTO.fans_count);
			//商品信息

			for(var i = 0; i<data.goodsDetails.length; i++){
				var detailLink =imgLink+data.goodsDetails[i].detailImg;

				$('.info').append('<img src="'+detailLink+'"/>')
			}
			
			//商品规格
			for(var i = 0; i<data.goodsSizes.length; i++){
				$('.c_box').append('<input type="button" value="" />');
				$('input','.c_box').eq(i).attr('value',data.goodsSizes[i].name);
			}
			//规格图片
			$('.title').children('.imgbox').children().attr('src',imgLink+data.goodsImages[2].imgName);
			//存储图片url
			window.localStorage.setItem("imgurl",imgLink+data.goodsImages[2].imgName);
			//默认存储第一个规格id
			window.localStorage.setItem("sizeId",data.goodsSizes[0].sizeId);
			//默认存储第一个规格商品单价
			window.localStorage.setItem("unitprice",data.goodsSizes[0].price);
			//规格选择
			
			$('input','.c_box').click(function(){
				var i = $(this).index()
				$(this).addClass('active').siblings().removeClass('active');
				$('i','.price').html(data.goodsSizes[i].price);
				$('i','.stock').html(data.goodsSizes[i].inventory);
				$('i','.choose').html(data.goodsSizes[i].name);
				//存储规格id
				window.localStorage.setItem("sizeId",data.goodsSizes[i].sizeId);
				//存储商品单价
				window.localStorage.setItem("unitprice",data.goodsSizes[i].price);
			})
			//默认规格价格
			$('i','.price').html(data.goodsSizes[0].price);
			//库存
			$('i','.stock').html(data.goodsSizes[0].inventory);
			//已选
			$('i','.choose').html(data.goodsSizes[0].name)
			//默认规格设置
			$('input','.c_box').eq(0).addClass('active');
			
			//购买说明
			//console.log(data.buyExplain)
			$('.buyexplain').html(data.buyExplain);
		}//callback;
		
	}
	return goodDetail;
})
