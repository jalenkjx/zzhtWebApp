define(['jquery'],function($){
	//获取用户id
	var userId = window.localStorage.getItem("userId");
	var token = window.localStorage.getItem('token');
	$.ajax({
		type:"get",
		url:"http://192.168.199.127:81/zzht/v1/api/shop/address/user/"+userId,
		async:true,
		data:{
			userId:userId
		},
		headers:{
			Authorization:'Bearer 6b2c0151-99b1-415b-a22b-58d75e462712'
		},
		success:function(res){
			//无数据列表
			if(res.datas==''){
				$('.add_address').css('display','block');
				$('.consignee_info').css('display','none');
			}
			
		}
		
	});
})
