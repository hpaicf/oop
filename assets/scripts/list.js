var console=console||{log:function(){}};
var isIE=!!window.ActiveXObject;
   //模态框的设置
var oMask=document.getElementById("mask");
//获取页面的高度和宽度
var sHeight=document.documentElement.scrollHeight;
var sWidth=document.documentElement.scrollWidth;
//可视区域，就是用户所看到的部分
var wHeight=document.documentElement.clientHeight;
var wWidth=document.documentElement.clientWidth;
function maskopen(){
    $('#mask').css('height',wHeight+"px");
    $('#mask').css('width',wWidth+"px");
    $("#mask").addClass("mask").fadeIn();
}
function maskclose(){
    $("#mask").removeClass("mask").fadeOut("slow");
}

(function($){
        $.extend({oop:{
        server_url:"http://115.28.133.46:8080/PurchasingProjectNew/",//服务器程序地址
        right_nav:null,//右侧导航栏
        head_nav:null,//当前导航
        init:function(){//页面初始化
            var that=this;
            that.init_css()//兼容性js css
            that.quick_to();//快捷链接
            that.change();//图片滑动效果
            that.item_more();
            that.nav_to();//导航栏滑块
            that.getpic_list(1);//商品项目列表
        },
        
        init_css:function(){
            var that=this;
            $(".blocktr .content:last-child,.login_div ul li:last-child").css("margin-right","0");
            // 登录注册框的按钮初始化隐藏
            $('#login_frame #loginBtn,#register_frame #registerBtn').addClass("hide");
            
             // 右侧栏dom加载
            that.right_nav=$('<!-- 右侧栏-->'+
                              '<div class="right">'+
                                '<div class="right_fixed hide">'+
                                   '<div class="uhead">'+
                                      '<img src="assets/images/user.png">'+
                                   '</div>'+
                                   '<div class="right_content">'+
                                    ' <div class="totop">'+
                                       ' <a href="#top" id="totopBtn"></a>'+
                                     '</div>'+
                                     '<div class="toptips">'+
                                      ' 回到顶部'+
                                     '</div>'+
                                  ' </div>'+
                                   
                                '</div>'+
                              '</div>');
            
            // 右侧栏dom加载
            $(".main_center").append(that.right_nav);
            // 列表每排最后一个没有margin
            $("#sellDiv .list_item,#missionDiv .list_item").each(function(i){
                 if (i%4==3) {
                    console.log(i);
                    $(this).css('margin-right','0px');
                 }
            });
        },

        
  
        // 获取图片展示列表
        getpic_list:function($page){
            var that=this;
            var dom = "";
            that.getpic_func({
                showCount:2,
                pageNum:$page
            },function($data){
                if($data.status > 0){
                    if($data.message.CommodityList.length> 0){
                        $.each($data.message.CommodityList, function(i, object){
                            var itemul="";
                            $.each(object.OTHER_PIC, function(j, item){
                                itemul+='<li><a href="javascript:;"><img src="'+object.OTHER_PIC[j].pic_url+'"></a></li>';
                            });
                            dom +='<!-- 每个项目 -->'+
                                    '<div class="list_item">'+
                                        '<div class="item_content">'+
                                            '<div class="item_img">'+
                                                '<img src="'+object.MAIN_PIC+'">'+
                                                '<div class="item_decrip">'+object.NAME+'</div>'+
                                            '</div>'+
                                            '<div class="more_img">'+
                                                ' <ul>'+itemul+//firstmoreimg thismoreimg
                                                '</ul>'+
                                            '</div>'+
                                            '<div class="place">'+
                                                '<a href="javascript:;" id="province">'+object.COUNTY+'</a>'+
                                                '<a href="javascript:;" id="city">'+object.PROVINCE+'</a>'+
                                            '</div>'+
                                            '<a href="javascript:;" class="sellname">'+object.CREATER_NAME+'</a>'+
                                            '<div class="price">￥'+object.PRICE+'</div>'+
                                       ' </div>'+
                                    '</div>'+
                                   '<!-- 每个项目 -->';
                        });
                        var totalpage=($data.message.page.totalResult%32==0?parseInt($data.message.page.totalResult/32):parseInt($data.message.page.totalResult/32)+1);
                        $("#sellDiv .list_content").empty().append(dom);
                        $("#sellDiv .list_content .list_item").each(function(i,item){
                            if (i%4==3) {
                                console.log(i);
                                $(this).css('margin-right','0px');
                            }
                        });
                        $("#sellDiv .page_content  .page_info").html("共"+totalpage+"页");
                        $("#sellDiv .page_content").show();
                        $("#sellDiv .pagination").pagination($data.message.page.totalResult, {
                            "items_per_page":2,
                            "num_display_entries":5,
                            "prev_text":"上一页",
                            "next_text":"下一页",
                            "callback":window.page_pic_callback
                        });

                        $(function() {           
                            $('#sellDiv .list_item .item_img').each( function() { $(this).hoverdir(); } );
                        });
                        $(".list_content .list_item .more_img li:first-child").css("margin-left","0");
                    } else {
                        $("#sellDiv .list_content").empty().append("<p align=\"center\ style='margin-top:100px'>暂无数据</p>");
                        $("#sellDiv .page_content").hide();
                    } 
                }
                else{

                }
            });
                
        },

        //获取音频、图片列表
        getpic_func:function($params,$fn){
            $.ajax({
                url:this.server_url+'PurchasingCommodity/list',
                type:"GET",
                dataType:"jsonp",
                data:$params,
                success:function($data){
                    if($fn){$fn($data);}    
                }
            });     
        },


        // 右侧栏快速到达
        quick_to:function(){

            /*鼠标向下滚动后触发的左边固定栏目出现事件*/
            var scrollFunc = function (e) { 
                e = e || window.event;
                if (e.wheelDelta < 0&& $(this).scrollTop()>150) { //当滑轮向下滚动时  
                    $('.right_fixed').removeClass('bounceOut hide').addClass('bounceInDown animated');
                    // setTimeout(function() {$('.right_fixed').removeClass('bounceInUp').addClass('bounceInDown animated');},10000);
                }
                if (e.wheelDelta> 0&& $(this).scrollTop()<500) { //当滑轮向上滚动时  
                    $('.right_fixed').removeClass('bounceIn').addClass('bounceOut'); 
                    // setTimeout(function() {$('.right_fixed').removeClass('bounceInDown').addClass('bounceInUp animated');},10000);
                }
                
            }  
            //给页面绑定滑轮滚动事件  
            if (document.addEventListener) {//firefox  
                document.addEventListener('DOMMouseScroll', scrollFunc, false);  
            }  
            //滚动滑轮触发scrollFunc方法  //ie 谷歌  
            window.onmousewheel = document.onmousewheel = scrollFunc;  
            $(".totop").bind("click",function(){
                $('html, body').stop().animate({ 
                    scrollTop: 0
                }, 600);
            });
            //回到顶部效果
            $(".totop").hover(function(){
                $('.toptips').stop().animate({ 
                    left: -80,opacity:'1'
                }, 1000);
            },function(){
                $('.toptips').stop().animate({ 
                    left: -120,opacity:'0'
                }, 1000);
            });
        },

        // 图片滑动效果和切换
        change:function() {

            // // 图片滑动效果
            // $('.item_img').live("mouseover",function(event){

            //     $(this).find('.item_decrip').stop(true).animate({height:"90px"},200);
            // });
            //  $('.item_img').live("mouseout",function(event){
            //     console.log("leave");
            //     $(this).find('.item_decrip').stop(true).animate({height:"36px"},200);
            // });

            // 祝福墙的图片音频展示切换
            $("#sellBtn").bind("click",function(){
                $("#missionDiv").fadeOut("slow");
                $("#sellDiv").fadeIn("slow");
                $("#missionBtn").removeClass("thischange");
                $("#sellBtn").addClass("thischange");
            });
            $("#missionBtn").bind("click",function(){
                $("#sellDiv").fadeOut("slow");
                $("#missionDiv").fadeIn("slow");
                $("#sellBtn").removeClass("thischange");
                $("#missionBtn").addClass("thischange");
            });
        },


        // 每个list项目小图切换
        item_more:function() {
            $(".more_img li a").live("mouseover",function(){
                var thisimg=$(this).find('img').attr('src');

                $(this).parent('li').siblings().removeClass('thismoreimg');
                $(this).parent('li').addClass('thismoreimg');
                $(this).parents('.more_img').prev('.item_img').find('img').attr('src',thisimg);
                console.log($(this).prev('li'));
            });           
        },

         // 导航栏滑块
        nav_to:function(){
            $(".nav ul li").hover(function(){
                var thisid=$(this).attr('id');
                var leftx=(thisid-1)*150;
                $('#this_nav').stop().animate({ 
                    left: leftx
                }, 500);
            },function(){
                $('#this_nav').stop().animate({ 
                    left:150
                }, 500);
            });
        }

    }});
})(jQuery)


$(function(){
    $.oop.init();
    // 焦点图设置
    $('.ck-slide').ckSlide({
        autoPlay: true
    });

});

    //图片列表分页回调
    function page_pic_callback($page, jq){
            var dom="";
            console.log("callback");
            $.oop.getpic_func({
                    showCount:2,
                    pageNum:$page+1
                }, function($data){
                if($data.status > 0){
                   if($data.message.CommodityList.length> 0){
                        $.each($data.message.CommodityList, function(i, object){
                            var itemul="";
                            $.each(object.OTHER_PIC, function(j, item){
                                itemul+='<li><a href="javascript:;"><img src="'+$.oop.server_url+object.OTHER_PIC[j].pic_url+'"></a></li>';
                            });
                            dom +='<!-- 每个项目 -->'+
                                    '<div class="list_item">'+
                                        '<div class="item_content">'+
                                            '<div class="item_img">'+
                                                '<img src="'+$.oop.server_url+object.MAIN_PIC+'">'+
                                                '<div class="item_decrip">'+object.NAME+'</div>'+
                                            '</div>'+
                                            '<div class="more_img">'+
                                                ' <ul>'+itemul+//firstmoreimg thismoreimg
                                                '</ul>'+
                                            '</div>'+
                                            '<div class="place">'+
                                                '<a href="javascript:;" id="province">'+object.COUNTY+'</a>'+
                                                '<a href="javascript:;" id="city">'+object.PROVINCE+'</a>'+
                                            '</div>'+
                                            '<a href="javascript:;" class="sellname">'+object.CREATER_NAME+'</a>'+
                                            '<div class="price">￥'+object.PRICE+'</div>'+
                                       ' </div>'+
                                    '</div>'+
                                   '<!-- 每个项目 -->';
                        });
                        $("#sellDiv .list_content").empty().append(dom);
                        $("#sellDiv .list_content .list_item").each(function(i,item){
                            if (i%4==3) {
                                console.log(i);
                                $(this).css('margin-right','0px');
                            }
                        });
                        $(function() {           
                            $('#sellDiv .list_item .item_img').each( function() { $(this).hoverdir(); } );
                        });
                        $(".list_content .list_item .more_img li:first-child").css("margin-left","0");
                        $("#sellDiv .page_content").show();
                    }
                }
            });
    }

  