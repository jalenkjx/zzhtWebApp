define(['jquery','param','iscroll','index/liveList'],function($,param,IScroll,liveList){
	return{
		myScroll:null,
		load:function(){
			var _this = this;
		        var distance = 200; //滑动距离
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, _this.isPassive() ? {
					capture: false,
					passive: false
				} : false);
		   _this. myScroll = new IScroll('#scroll', { probeType: 3, scrollY:true});
			var start = 0;
		   _this. myScroll.on("scrollEnd",function(){
		   			var that = this;
		        	var y = this.y;
		           	var maxY = this.maxScrollY;
		           	var dist = this.distY;
		           	
		            if(y==maxY&&dist<-200){
		            	
		            	start += 20;
		            	liveList.live_recommend(start);
		            	this.refresh();
		            }
//		            downHasClass = downIcon.hasClass("reverse_icon"),
//		            var upHasClass = upIcon.hasClass("reverse_icon");
		
//		        if(y >= distance){
//		            !downHasClass && downIcon.addClass("reverse_icon");
//		            return "";
//		        }else if(y < distance && y > 0){
//		            downHasClass && downIcon.removeClass("reverse_icon");
//		            return "";
//		        }
		
//		        if(maxY >= distance){
//		            !upHasClass && upIcon.addClass("reverse_icon");
//		            return "";
//		        }else if(maxY < distance && maxY >=0){
//		            upHasClass && upIcon.removeClass("reverse_icon");
//		            return "";
//		        }
	        })
		},
		isPassive:function(){
			var supportsPassiveOption = false;
		    try {
		        addEventListener("test", null, Object.defineProperty({}, 'passive', {
		            get: function () {
		                supportsPassiveOption = true;
		            }
		        }));
		    } catch(e) {}
		    return supportsPassiveOption;
		}
		
	}
})