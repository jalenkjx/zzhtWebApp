define(['jquery'],function($){
	function setFontSize(){
                  // 设计稿 640px
                  var width = document.documentElement.clientWidth;
                  var fontSize = (width / 750) * 100;
                 document.getElementsByTagName("html")[0].style.fontSize = fontSize + "px";
             }
	
	function rem(){
		$(window).on("resize",setFontSize);
		setFontSize();
		
	}
    return rem();
})
