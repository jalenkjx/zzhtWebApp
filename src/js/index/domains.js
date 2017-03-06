define(['jquery','param'],function($,param){
	return {
		domains:function(){
			$.ajax({
				type:"get",
				url:param.api+"v1/api/domain/get_domains?app_version="+param.app_version,
				async:false,
				success:function(res){
//					console.log(res);//27;
					$.each(res.datas, function(key,item) {
						//首页icon
						if(item.name=='home-nav'){
//							console.log(item);
							for(var i = 0; i<item.imginfo.length; i++){
								if(item.imginfo[i].position=='2'){

									$('.imgBox').eq(0).children('img').attr('src',item.imginfo[i].url);
								}
								if(item.imginfo[i].position=='3'){
									$('.imgBox').eq(1).children('img').attr('src',item.imginfo[i].url);

								}
								if(item.imginfo[i].position=='4'){
									$('.imgBox').eq(2).children('img').attr('src',item.imginfo[i].url);

								}
							}
						}
						if(item.name=='home-sub-nav'){
							for(var i = 0; i<item.imginfo.length; i++){
								if(item.imginfo[i].position=='2'){
									$('.imgNavLfet').children('img').attr('src',item.imginfo[i].url);
								}
								if(item.imginfo[i].position=='3'){
									$('.img_rtop').children('img').attr('src',item.imginfo[i].url);
								}
								if(item.imginfo[i].position=='4'){
									$('.img_rbottom').children('img').attr('src',item.imginfo[i].url);
								}
							}
						}
					});
				}
			});
		}
	}
})