//该模块获取收货地址   结算
define(['jquery','pingpp','param'],function($,pingpp){
	var createOrder={
		init	:	function(){
			var _this = this;
			_this.getAddressList();
			_this.previewOrder();
			$('button','footer').on('click',function(e){
				if($('.add_address').css('display')=='block'){
					$('.alert').eq(0).children('p').html('请添加收货人信息');
					$('.alert').css('display','block');
					$('.alert_sure').on('click',function(){
						$('.alert').css('display','none');
					})
				}else{
					$(this).attr('disabled','disabled');
					$(this).css('background','#858585');
					$(this).html('正在结算...');
					e.stopPropagation();
					_this.createOrderJoggle(_this.createOrderParam)
				}
			})
		},
		userId	:	window.localStorage.getItem("userId"),
		token	:	window.localStorage.getItem('access_token'),
		sellerId:	window.localStorage.getItem('sellerId'),
		//默认渠道为alipay;
		channel	:	'alipay_wap',
		//支付商品信息
		payinfos:	null,
		//支付总价
		total	:	null,
		//创建订单参数
		createOrderParam:null,
		ip		:	null,
		addrId	:	null,
		getIp	:	function(){
			var _this = this;
			var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
			$.getJSON(url,function(data){
				_this.ip = data.Ip;
				window.localStorage.setItem('ip',data.Ip);
			})
		},
		goodsId	:	window.localStorage.getItem('goods_id'),
		//购买数量
		num		:	window.localStorage.getItem('buyNum'),
		//规格id
		sizeId	:	window.localStorage.getItem('sizeId'),
		//获取用户收货地址列表接口
		getAddressList	:	function(){
			var _this = this;
			$.ajax({
				type	:	"get",
				url		:	api+"v1/api/shop/address/user/"+_this.userId,
				async	:	false,
				headers	:	{
					'Authorization':'Bearer '+_this.token
				},
				success	:	function(res){
					console.log(res)
					_this.gALCallback(res);
				}
				
			});
		},
		//获取收货地址回调
		gALCallback	:function(res){
			var _this = this;
			//无数据列表
			if(res.datas==''){
				$('.add_address').css('display','block');
				$('.consignee_info').css('display','none');
			}else{
				$('.add_address').css('display','none');
				$('.consignee_info').css('display','block');
				for(var i=0; i<res.datas.length; i++){
					//显示默认收货地址
						//判断地址是否为默认
						//console.log(res.datas[i].isDefault);
					if(res.datas[i].isDefault){
						//存储收货地址id
						_this.addrId = res.datas[i].address_id;
						window.localStorage.setItem("addrId",res.datas[i].address_id);
						var data = res.datas[i];
						$('.info_name').html(data.contacts);
						//替换手机号中间几位；
						var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
						var tel = data.mobile.replace(reg, "$1****$3");
						$('.phoneNum').html(tel);
						//收货地址
						$('.info_address').children('span').html(data.addressName);
						
						//获取收货地址id
//						addrId = window.localStorage.getItem('addrId');
//						console.log(addrId);
					}
				}//遍历datas；
			}//else	
		},
		//订单准备接口
		previewOrder:function(){
			var _this = this;
			var beforeOrder = JSON.stringify({
		    		"buyerId":_this.userId,
		    		"payGoodsInfos":[{"goodsId":_this.goodsId,"num":_this.num,"sizeId":_this.sizeId}]
		   	});
		   	$.ajax({
		   		type	:	"post",
		   		url		:	api+"v1/api/shop/order/preview",
		   		async	:	false,
		   		data	:	beforeOrder,
		   		headers	:	{
		   			'Authorization':'Bearer '+_this.token,
		   			'Content-Type': 'application/json'
		   			},
		   		success	:	function(res){
		   			_this.previewCallback(res);
		   		}
		   	});
		},
		//订单准备接口回调
		previewCallback	:	function(res){
			var _this = this;
			//支付商品的信息
    		_this.payinfos = JSON.stringify(res.datas.payGoodsInfos);
    		//总运费(获取为分)
    		var cost = res.datas.orderExpressAmount/100;
    		$('.cost').children('p').children('span').html(cost);
    		//总价 合计
    		_this.total = res.datas.orderAmount
    		$('footer').children('p').children('span').children('i').html(_this.total/100);
    		//默认创建订单参数
    		
		    var objOrder = {
				"order":{
					"buyerId":_this.userId,
					"sellerId":_this.sellerId,
					"amount":_this.total,
					"currency":"cny",
					"channel":_this.channel,
					"clientIp":_this.ip,
					"addressId":_this.addrId,
					"payGoodsInfo":_this.payinfos
				}
			}
    		_this.createOrderParam = JSON.stringify(objOrder);
    		//支付方式选择
			$('li','.pay_method').on('click',function(e){
				e.stopPropagation();
				$(this).addClass('active').siblings('li').removeClass('active');
				//选择支付渠道改变订单参数;
//				console.log($('li.active').index());
				if($('li.active').index() == 1){
					_this.channel = 'wx_pub';
				}else{
					_this.channel = 'alipay_wap';
				}
				//创建订单的参数改变;
				objOrder = {
					"order":{
						"buyerId":_this.userId,
						"sellerId":_this.sellerId,
						"amount":_this.total,
						"currency":"cny",
						"channel":_this.channel,
						"clientIp":_this.ip,
						"addressId":_this.addrId,
						"payGoodsInfo":_this.payinfos
					}
				}
				console.info(_this.channel);
				_this.createOrderParam = JSON.stringify(objOrder);
			});
    		
		},
		//创建订单接口
		createOrderJoggle:function(order){
			var _this = this;
			$.ajax({
				type:"POST",
				url:api+"v1/api/shop/order",
				data:order,
				crossDomain: true,
				dataType:'json',
				headers:{
					'Authorization':'Bearer '+_this.token,
					'Content-Type': 'application/json'
				},
				success:function(res){
					pingpp.createPayment(res.datas, function(result, err){
						console.log(result);
						console.log(err.msg);
						console.log(err.extra);
						if (result == "success") {
						    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
						} else if (result == "fail") {
						    // charge 不正确或者微信公众账号支付失败时会在此处返回
						} else if (result == "cancel") {
						    // 微信公众账号支付取消支付
					  	}
					});
				}
			})
		}

	}
	return createOrder;
})//define
