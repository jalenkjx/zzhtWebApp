define(['jquery'],function($){
	function check(){
		$('#logIn').click(function(){
			{	
				
				//获取手机号和密码
				var phoneNum = $('#phoneNumber').val();
				var pwd = $('#pwd').val();
				if( phoneNum=='' | pwd == ''){
					alert('请输入用户名与密码')
				}else{
						//检测终端是安卓或ios
					var client_id;
					var client_secret;
		            var u = navigator.userAgent;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					//console.log(isiOS);
					if(isAndroid){
						client_id = '302a7d556175264c7e5b326827497349';
						client_secret = '4770414c283a20347c7b553650425773';
					}else{
						client_id = '5e572e694e4d61763b567059273a4d3d';
						client_secret = '316457735c4055642744596b302e2151';
					}
					//代理跨域
					$.get('/api/login',
						{
							//传递参数
							"grant_type":"password",
							"client_id":client_id,
							"client_secret":client_secret,
							"username":phoneNum,
							"password":pwd
						}
					,function(res){
						//存储access_token;
						//console.log(res)
						if(res.error_description=="The user is not found"){
							alert('该用户未注册，请先注册');
						}else if(res.error_description=="code:22013,message:`Error.Incorrect password.`"){
							alert('密码输入错误');
						}else{
							window.localStorage.setItem('access_token', res.access_token);
							var token = window.localStorage.getItem('access_token');
							//console.log(token);
							//window.location.href = "order.html";
//							$.ajax({
//								type:"post",
//								url:"http://192.168.199.127/zzht/v1/api/users/getUserByLoginName",
//								async:true,
//								
//								accepts:{
//									'Content-Type': 'application/x-www-form-urlencoded',
//									'Authorization': 'Bearer c96d6765-2cc8-4e26-bdbb-d8d81f9a347c'
//								},
//								data:{
//									
//									loginName:phoneNum,
//									thirdType:' '
//								},
//								success:function(res){
//									console.log(res);
//								}
//							});
						}
						
					},'json');
					
					$.ajax('http://192.168.199.127/zzht/v1/api/users/getUserByLoginName',
					{
						type: 'post',
						dataType: 'json',
					    beforeSend: function (xhr) {
					      xhr.setRequestHeader("Authorization", "Bearer c96d6765-2cc8-4e26-bdbb-d8d81f9a347c")
					    },
					    complete: function (resp) {
					      console.log(resp);
					    },
					    error: function (jqXHR,  textStatus,  errorThrown) {
					      console.log(textStatus);
					    }
					  }
					);
				}//else
				

			}//click
		})
		
	}
	
	return check();
})

