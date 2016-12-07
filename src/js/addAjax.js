define(['jquery'], function() {
	//
	var userId = window.localStorage.getItem('userId');
	var token = window.localStorage.getItem('access_token');
	$('#add').click(function(e) {
		
		e.stopPropagation();
		var de = 0;
		if($('#ch').is(':checked')){
			de = 1;
		}
		if($('#name').val() == '' | $('#idCard').val() == '' | $('#phoneNum').val() == '' | $('#postcode').val() == '' | $('#choose').val() == '' | $('#detailarea').val() == '') {
			alert('请输入完整信息');
		} else {
			$(this).attr('disabled','disabled');
			$(this).css('background','#858585')
			$(this).html('正在保存您收货信息...');
			var param = JSON.stringify(
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
				url: "http://192.168.199.127:81/zzht/v1/api/shop/address",
				async: true,
				data:param,
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				dataType:'json',
				success: function(res){	
					console.log(res);
					window.location.href = "/address.html"
				}
			});
		}

	})
})