define(['jquery','param'], function($,param) {

	var userId = window.localStorage.getItem('userId');
	var token = window.localStorage.getItem('access_token');
	$('#add').click(function(e) {
		
		e.stopPropagation();
		var de = 0;
		if($('#ch').is(':checked')){
			de = 1;
		}
		if($('#name').val() == '' | $('#idCard').val() == '' | $('#phoneNum').val() == '' | $('#postcode').val() == '' | $('#choose').val() == '' | $('#detailarea').val() == '') {
			$('.alert').eq(0).children('p').html('请填写完整信息')
			$('.alert').css('display','block');
			$('.alert_sure').on('click',function(){
				$('.alert').css('display','none');
			})
		} else {
			$(this).attr('disabled','disabled');
			$(this).css('background','#858585')
			$(this).html('正在保存您收货信息...');
			var paramss = JSON.stringify(
				{"address":{
							"userId": userId,
							"addressName": $('#choose').val() + $('#detailarea').val(),
							"contacts": $('#name').val(),
							"mobile": $('#phoneNum').val(),
							"idno": $('#idCard').val(),
							"postcode": $('#postcode').val(),
							"isDefault": de
							}
				});
			
			//console.log(param);
			$.ajax({
				type: "post",
				url: param.api+"v1/api/shop/address",
				async: false,
				data:paramss,
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				dataType:'json',
				success: function(res){	
					console.log(res);
					window.location.href = "./address.html"
				}
			});
		}

	})
})