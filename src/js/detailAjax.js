define(['jquery'],function($){
	
	var imgLink = 'http://o6uda1nl0.bkt.clouddn.com/';//内网
	//var imgLink = 'http://7xrr05.com1.z0.glb.clouddn.com/';//外网
	
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null)
		return unescape(r[2]);
		return null; //返回参数值
	}
	var goodid = getUrlParam('goods_id');
	$.get('http://192.168.199.127/zzht/v1/api/shop/goods/'+goodid,
		{
			'goodsId':goodid
		},
		function(res){
			var data = res.datas;
			console.log(data);
			
			//动态创建轮播图
			for(var i = 0; i<data.goodsImages.length/3; i++){
				var imgIndex = 3*i+2;
				
				//console.log(imgLink);
				var bannerHtml = '<div class="swiper-slide"><img src="" alt="" /></div>'
				
				$('.swiper-wrapper').append(bannerHtml);
				$('img','.swiper-slide').eq(i).attr('src',imgLink+data.goodsImages[imgIndex].imgName);
			}
			//轮播图js
			new Swiper ('.swiper-container', {
					    direction: 'horizontal',
					    autoplay: 2500,
					    // 分页器
					    pagination: '.swiper-pagination',
					    autoplayDisableOnInteraction:false,
					  }) 
			//商品价格
			$('.goodPriceInt').html(data.actualPrice);
			//商品名称
			var nameHtml = '<span>'+data.name+'</span>';
			$('.goodName').html(nameHtml);
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
			//console.log(data.goodsDetails[0].detailImg);
			//console.log(data.goodsDetails.length)
			for(var i = 0; i<data.goodsDetails.length; i++){
				var detailLink =imgLink+data.goodsDetails[i].detailImg;
				//console.log(detailLink);
				$('.info').append('<img src="'+detailLink+'"/>')
			}
			
			//商品规格
			for(var i = 0; i<data.goodsSizes.length; i++){
				$('.c_box').append('<input type="button" value="" />');
				$('input','.c_box').eq(i).attr('value',data.goodsSizes[i].name);
			}
			//规格图片
			$('.title').children('.imgbox').children().attr('src','http://o6uda1nl0.bkt.clouddn.com/'+data.goodsImages[2].imgName);
			//存储图片url
			window.localStorage.setItem("imgurl",imgLink+data.goodsImages[2].imgName);
			//默认存储第一个规格id
			window.localStorage.setItem("sizeId",data.goodsSizes[0].sizeId);
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
			
			//点击规格里的下单按钮     存储数据并跳转；
			$('#createOrder').click(function(e){
				e.stopPropagation();
				//存储商品id
				window.localStorage.setItem("goods_id",goodid);
				//存储购买数量
				window.localStorage.setItem("buyNum",$('.num').val())
				
				window.location.href = "Login.html";
			})
		})
})
