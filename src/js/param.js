define(['jquery'],function(){
	 //api = 'http://zhenzhen.s1.natapp.cc/zzht/';
	api = 'http://192.168.199.127/zzht/';
	// api = 'http://service.myzhenzhen.com/zzht/';
	 imgLink = 'http://o6uda1nl0.bkt.clouddn.com/';//内网
	// imgLink = 'http://7xrr05.com1.z0.glb.clouddn.com/';//外网
	
	$.ajax({
		type:"get",
		url:api+"v1/api/domain/get_domains",
		success:function(res){
			console.log(res);
			$.each(res.datas,function(i){
				
			})
		}
	});
})