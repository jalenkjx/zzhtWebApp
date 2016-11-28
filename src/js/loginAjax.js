define(['jquery'],function($){
	function check(){
		$('#logIn').click(function(){
			{	
				
				//获取手机号和密码
				var phoneNum = $('#phoneNumber').val();
				var pwd = $('#pwd').val();
				if( phoneNum=='' | pwd == ''){
					alert('请输入用户名与密码')
				}
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
					//console.log(res);
					//存储access_token;
					window.localStorage.setItem('access_token', res.access_token);
					
				},'json')

			}
		})
		
	}
	
	return check();
})

