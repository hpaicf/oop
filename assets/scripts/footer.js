var console=console||{log:function(){}};
(function($){
        $.extend({footer:{
        server_url:"http://115.28.133.46:8080/PurchasingProjectNew/",//服务器程序地址
        footerDom:null,//注册弹出框
        init:function(){//页面初始化
        	var that=this;
            that.init_css()//兼容性js css
        },
        
        init_css:function(){
            var that=this;
            // 底部footer  dom加载
            that.footerDom=$('<!-- 底部 -->'+
								'<div class="footer">'+
								  '<div class="foot_main">'+
								  '<div class="foot_b1 foot">'+
								    '<ul>'+
								      '<li><a href="javascript:;">关于我们</a></li>'+
								      '<li><a href="javascript:;">关于圈圈人</a></li>'+
								      '<li><a href="javascript:;">加入圈圈人</a></li>'+
								   ' </ul>'+
								 ' </div>'+
								   '<div class="foot_b2 foot ">'+
								     '<ul>'+
								      '<li><a href="javascript:;">联系我们</a></li>'+
								      '<li><a href="javascript:;">地址：广东省珠海市金凤路1号</a></li>'+
								      '<li><a href="javascript:;">电话：07561234567</a></li>'+
								    '</ul>'+
								  ' </div>'+
								    '<div class="foot_b3 foot">'+
								     ' <ul>'+
								      '<li><a href="javascript:;">关注我们</a></li>'+
								      '<li><a href="javascript:;">新浪微博：@捧在手心的圈圈人</a></li>'+
								      '<li><a href="javascript:;">官方微信：OO人</a></li>'+
								   ' </ul>'+
								   ' </div>'+
								   ' </div>'+
								'</div>');
            // 插入注册框
             $(".wrapper_html").after(that.footerDom);
        }
    }});
})(jQuery)

$(function(){
   $.footer.init();
});

  