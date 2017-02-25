define(['jquery','param'],function($,param){
	return {
		domains:function(){
			$.ajax({
				type:"get",
				url:param.api+"v1/api/domain/get_domains",
				async:false,
				success:function(res){
//					console.log(res);//27;
				}
			});
		}
	}
})