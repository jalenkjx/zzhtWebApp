define(['jquery','param','iscroll'],function($,param,IScroll){
	return{
		leftNav:null,
		rightNav:null,
		load:function(){
			var _this = this;
			_this.leftNav = new IScroll('#leftNav', { probeType: 3, scrollY:true, click:true});
			_this.rightNav = new IScroll('#rightNav', { probeType: 3, scrollY:true, click:true});
			$.ajax({
				type:"get",
				url:param.api+"v1/api/shop/goodsCatalog/list",
				async:false,
				success:function(res){
//					console.log(res);
					$.each(res.datas.catalogs, function(key,item) {
						var html = '<li data-id="'+item.id+'">'+item.name+'</li>';
						$('#catalog_L').append(html);
					});
					$('#catalog_L').children(':first').addClass('active');
				}
			});
		},
			
		sub_Load:function(id){
			var _this = this;
			$('#scrollerRight').empty();
			$.ajax({
				type:"get",
				url:param.api+"v1/api/shop/goodsCatalog/list?parentId="+id,
				async:false,
				success:function(res){
					console.log(res);
					$.each(res.datas.subCatalogs,function(key,item){
						var text = '<div class="catalogItem">'+
										'<h3 class="catalogtitle">'+item.name+'</h3>'+
										'<div class="catalog" id="cata'+key+'"></div>'+
									'</div>';
						var txt = '';
						$.each(item.subCatalogs,function(key,item){
							txt+=	'<dl data-id="'+item.id+'">'+
										'<dt><img src="'+param.imgLink+item.img+'" alt="" /></dt>'+
										'<dd>婴儿服饰</dd>'+
									'</dl>';
						})
						$('#scrollerRight').append(text);
						$('#cata'+key).html(txt);
					})
					
					_this.rightNav.refresh();
				}
			})
		}
		
	}
})
