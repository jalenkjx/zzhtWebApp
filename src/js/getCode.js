define(['jquery'],function($){
	//防止页面刷新倒计时失效
	/**
	 *
	 *   获取验证码按钮
	 */
	function monitor(obj) {
	    var LocalDelay = getLocalDelay();
	    var timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
	    if (timeLine > LocalDelay.delay) {
	        console.log("过期");
	    } else {
	        _delay = LocalDelay.delay - timeLine;
	        obj.text(_delay).addClass("btn-disabled");
	        var timer = setInterval(function() {
	            if (_delay > 1) {
	                _delay--;
	                obj.text(_delay);
	                setLocalDelay(_delay);
	            } else {
	                clearInterval(timer);
	                obj.text("获取验证码").removeClass("btn-disabled");
	            }
	        }, 1000);
	    }
	};
	
	//倒计时效果
	/**
	 *
	 * @param {Object} obj 获取验证码按钮
	 * @param {Function} callback  获取验证码接口函数
	 */
	function countDown(obj, callback) {
	    if (obj.html() == "获取验证码") {
	        var _delay = 60;
	        var delay = _delay;
	        obj.text(_delay).addClass("btn-disabled");
	        var timer = setInterval(function() {
	            if (delay > 1) {
	                delay--;
	                obj.text(delay);
	                setLocalDelay(delay);
	            } else {
	                clearInterval(timer);
	                obj.html("获取验证码").removeClass("btn-disabled");
	            }
	        }, 1000);
	
	        callback();
	    } else {
	        return false;
	    }
	}
	
	//设置setLocalDelay
	function setLocalDelay(delay) {
	    //location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
	    localStorage.setItem("delay_" + location.href, delay);
	    localStorage.setItem("time_" + location.href, new Date().getTime());
	}
	
	//getLocalDelay()
	function getLocalDelay() {
	    var LocalDelay = {};
	    LocalDelay.delay = localStorage.getItem("delay_" + location.href);
	    LocalDelay.time = localStorage.getItem("time_" + location.href);
	    return LocalDelay;
	}

	$('#phoneNum').on('blur',function(){
		if($('#phoneNum').val()==''){
			alert('请输入手机号码');
		}else{
			$('#getCheckCode').attr('disabled','false');
			$('#getCheckCode').removeClass('btn-disabled');
			
			
		}
	});
	//监听
	monitor($('#getCheckCode'));
	$('#getCheckCode').click(function(){
		countDown($('#getCheckCode'), getCode);
		$(this).attr('disabled','true');
		setTimeout(function(){
			$(this).attr('disabled','');
		},60000)
	});
	function getCode(){
		$.ajax({
			url:'./test.json',
			type:'get',
			complete:function(res){
				console.log(res);
			}
		})
	}

})
