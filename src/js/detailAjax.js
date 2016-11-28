define(['jquery'],function($){
	var goodid = 33137;
	$.get('api/details',
		{
			'goodsId':'33137'
		},
		function(res){
		console.log(res)
	})
})
