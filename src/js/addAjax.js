define(['jquery'], function() {
	//
	var userId = window.localStorage.getItem('userId');
	var token = window.localStorage.getItem('access_token');
	$('#add').click(function(e) {
		e.stopPropagation();
		if($('#name').val() == '' | $('#idCard').val() == '' | $('#phoneNum').val() == '' | $('#postcode').val() == '' | $('#choose').val() == '' | $('#detailarea').val() == '') {
			alert('请输入完整信息');
		} else {
			var prama = JSON.stringify({"address":{
						"userId": userId,
						"addressName": $('#choose').val() + $('#detailarea').val(),
						"contacts": $('#name').val(),
						"mobile": $('#phoneNum').val(),
						"idno": $('#idCard').val(),
						"postcode": $('#postcode').val(),
						"isDefault": $('#ch').is(':checked')
					}})
			
			console.log(prama);
			$.ajax({
				type: "post",
				url: "http://192.168.199.127:81/zzht/v1/api/shop/address",
				async: true,
				data: prama,
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				dataType:'json',
				complete: function(res) {
					console.log(res);
				}
			});
		}

	})
})