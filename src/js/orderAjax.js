//该模块获取收货地址   结算

define(['jquery','pingpp'],function($,pingpp){
	//var api = 'http://192.168.199.127/zzht/'
	var api = 'http://zhenzhen.s1.natapp.cc/zzht/'
	//var api = 'http://service.myzhenzhen.com/zzht/'
	window.location.reload;
	//获取用户id
	var userId = window.localStorage.getItem("userId");
	//获取token
	var token = window.localStorage.getItem('access_token');
	//获取收货地址id
	var addrId = window.localStorage.getItem('addrId');
	
	//卖家id
	var sellerId = window.localStorage.getItem('sellerId');
	//获取ip地址
	var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
        $.getJSON(url, function (data) {
           window.localStorage.setItem('ip',data.Ip);
        });
    var ip = window.localStorage.getItem('ip');
    //商品id
    var　goodsId = window.localStorage.getItem('goods_id');
    //商品数量
    var num = window.localStorage.getItem('buyNum');
    //规格id
    var sizeId = window.localStorage.getItem('sizeId');

    //创建订单前的数据准备接口参数
    var beforeOrder = JSON.stringify(
    	{
    		"buyerId":userId,
    		"payGoodsInfos":[{"goodsId":goodsId,"num":num,"sizeId":sizeId}]
    	}
    )
    //console.log(beforeOrder);
	
    
    
    
    
    //获取用户收货地址列表接口
	$.ajax({
		type:"get",
		//url:"http://service.myzhenzhen.com/zzht/v1/api/shop/address/user/"+userId",
		url:api+"v1/api/shop/address/user/"+userId,
		async:true,
		data:{
			'userId':userId
		},
		dataType:'json',
		headers:{
			'Authorization':'Bearer '+token
		},
		success:function(res){
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
						window.localStorage.setItem("addrId",res.datas[i].address_id);
						var data = res.datas[i];
						$('.info_name').html(data.contacts);
						//替换手机号中间几位；
						var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
						var tel = data.mobile.replace(reg, "$1****$3");
						$('.phoneNum').html(tel);
						//收货地址
						$('.info_address').children('span').html(data.addressName);
					}
				}//遍历datas；
				
				
				
				
			    //创建订单前数据准备接口
				$.ajax({
			    	type:"post",
			    	url:api+"v1/api/shop/order/preview",
			    	//url:"http://service.myzhenzhen.com/zzht/v1/api/shop/order/preview",
			    	data:beforeOrder,
			    	headers:{
			    		'Authorization':'Bearer '+token,
						'Content-Type': 'application/json'
			    	},
			    	success:function(res){
			    		//console.log(res);
			    		
			    		//支付商品的信息
			    		var payinfos = JSON.stringify(res.datas.payGoodsInfos);
			    		
			    		//总运费(获取为分)
			    		var cost = res.datas.orderExpressAmount/100;
			    		
			    		$('.cost').children('p').children('span').html(cost);
			    		
			    		//总价 合计
			    		var total = res.datas.orderAmount
			    		$('footer').children('p').children('span').children('i').html(total/100);
			    		//默认渠道为alipay;
			    		var channel = 'alipay_wap';
			    		//默认创建订单参数
		    		    var objOrder = {
								"order":{
									"buyerId":userId,
									"sellerId":sellerId,
									"amount":total,
									"currency":"cny",
									"channel":channel,
									"clientIp":ip,
									"addressId":addrId,
									"payGoodsInfo":payinfos
								}
							}
					    var order = JSON.stringify(objOrder);
						//支付方式选择
						$('li','.pay_method').on('click',function(e){
							e.stopPropagation();
							$(this).addClass('active').siblings('li').removeClass('active');
							//选择支付渠道改变订单参数;
							if($('li.active').index() == 1){
								channel = 'wx_wap';
							}else{
								channel ='alipay_wap';
							}
							//创建订单的参数改变;
							objOrder = {
								"order":{
									"buyerId":userId,
									"sellerId":sellerId,
									"amount":total,
									"currency":"cny",
									"channel":channel,
									"clientIp":ip,
									"addressId":addrId,
									"payGoodsInfo":payinfos
								}
							}
							order = JSON.stringify(objOrder);
						});
			    		//点击结算
						$('button','footer').on('click',function(e){
							$(this).attr('disabled','disabled');
							$(this).css('background','#858585');
							$(this).html('正在结算...');
							e.stopPropagation();
							//创建订单接口
							$.ajax({
								type:"POST",
								url:api+"v1/api/shop/order",
								//url:'http://192.168.199.113/zzht/v1/api/shop/order',
								//url:"http://service.myzhenzhen.com/zzht/v1/api/shop/order",
								data:order,
								crossDomain: true,
								dataType:'json',
								headers:{
									'Authorization':'Bearer '+token,
									'Content-Type': 'application/json'
								},
								success:function(res){
									console.log(res);
									//ping++
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
							});
						});//结算按钮点击事件	
			    	}//创建订单前的数据准备接口 success;
			    });//创建订单前的数据准备接口
			}//else	
		}//收货地址ajax success
	});//收货地址ajax
})//define
