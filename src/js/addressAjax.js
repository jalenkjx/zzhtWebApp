define(['jquery'],function($){
	var api = 'http://zhenzhen.s1.natapp.cc/zzht/'
	//var api = 'http://192.168.199.127/zzht/'
	//var api = 'http://service.myzhenzhen.com/zzht/'
	
	var userId = window.localStorage.getItem('userId');
	var token = window.localStorage.getItem('access_token');
	//console.log(userId);
	$.ajax({
		type:"get",
		//url:"http://service.myzhenzhen.com/zzht/v1/api/shop/address/user/"+userId,
		url:api+"v1/api/shop/address/user/"+userId,
		
		headers:{
			"Authorization":"Bearer "+token
		},
		success:function(res){
			//console.log(res)
			//拼接收货地址信息
			for(var i = 0;i<res.datas.length; i++){
				var html = 
				'<li data-id='+res.datas[i].address_id+'>'+
					'<p>'+
						'<span class="name">'+res.datas[i].contacts+'</span>'+
						'<span class="tel">'+res.datas[i].mobile+'</span>'+
					'</p>'+
					'<p>'+res.datas[i].addressName+'</p>'+
					'<p class="del"><a href="javascript:;">删除</a></p>'+
				'</li>'
				$('#address').append(html);
				if(res.datas[i].isDefault){
					$('#address').children('li').eq(i).addClass('checked');
					$('#address').children('li').eq(i).children('p').eq(1).prepend('<span class="default">[默认]</span>');
				}
			}
			
			//设置默认收货地址选中状态
			$('li').click(function(e){
				e.stopPropagation();
				//设置默认收货地址接口
				var addressId = $(this).attr('data-id');
				var this_=$(this);
				if($(this).children('p').children('.default').length){
					alert('此地址已经是默认地址');
				}else{
					$.ajax({
						url:api+'v1/api/shop/address/default/'+addressId+'?userId='+userId,
						//url:'http://service.myzhenzhen.com/zzht/v1/api/shop/address/default/'+addressId+'?userId='+userId,
						type : 'PUT',
						data:{'userId':userId,'addrId':userId},
						cache:false,
						headers:{
							'Authorization':'Bearer '+token
						},
						success:function(res){
							//console.log(res);
							if(res.res_code==200){
								this_.addClass('checked').siblings('li').removeClass('checked');
								this_.children('p').eq(1).prepend('<span class="default">[默认]</span>');
								this_.siblings().children('p').children('.default').remove();
							}
						}
					});
				}
				
			});
			//删除收货地址
			$('a','li').click(function(e){
				e.stopPropagation();
				var addressId = $(this).parents('li').attr('data-id');
				var i = $(this).parents('li').index();
				if(confirm("确定要删除数据吗")){
					
					//调删除接口
					$.ajax({
						//url:'http://service.myzhenzhen.com/zzht/v1/api/shop/address/'+addressId+'?userId='+userId,
						url:api+'v1/api/shop/address/'+addressId+'?userId='+userId,
						type:'DELETE',	
						//data:{'userId':userId,'addrId':addressId},
						cache:false,
						headers:{
							'Authorization':'Bearer '+token
						},
						success:function(res){
							//console.log(res);
							if(res.res_code==200){
								$('li').eq(i).remove();
							}
							
						}
					})//delete 接口
			   }//confirm	
			});//点击删除按钮事件；
		}//请求收货地址列表接口success
	});//
})
