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
        $.extend({header:{
        server_url:"http://115.28.133.46:8080/PurchasingProjectNew/",//服务器程序地址
        target:0,
        loginCount:0,//用户登录次数
        phoneCode:"",
        second:60,
        headDom:null,//头部dom的加载
        login_frame:null,//登录弹出框
        register_frame:null,//注册弹出框
        init:function(){//页面初始化
            var that=this;
            that.init_css()//兼容性js css
            that.registerPhone_click();//注册手机地选择
            that.login_model();//登录接口
            that.register_model();//注册接口
            that.textvarify();//文本验证码接口
            that.headlogin_click();//顶部登录点击事件
            that.headregister_click();//顶部注册点击事件
            that.getphone_text();//接收短信接口
            that.login_reg_check();//登录注册验证为空

        },
        
        init_css:function(){
            var that=this;
            $(".blocktr .content:last-child,.login_div ul li:last-child").css("margin-right","0");
            // 登录注册框的按钮初始化隐藏
            $('#login_frame #loginBtn,#register_frame #registerBtn').addClass("hide");
            // 头部header  dom加载
            that.headDom=$('<div class="html_top"></div>'+
                       '<!-- 头部 -->'+
                       '<div class="head">'+
                          '<div class="head_top">'+
                              '<div class="logo">'+
                                  
                              '</div>'+
                              '<div class="search">'+
                                  '<div class="search_text">'+
                                      '<input type="text" placeholder="全球最好用的12款面膜~" id="search_content">'+
                                  '</div>'+
                                  '<div class="searchBtn">'+
                                     '<a href="javascript:;">搜索</a>'+
                                  '</div>'+
                              '</div>'+
                              '<div class="login_div">'+
                                '<!-- 登录后 -->'+
                                '<!-- <div class="status">'+
                                  '<div class="user">'+
                                     '<img src="assets/images/user.png"><a href="javascript:;" id="username">菜包大人</a>'+
                                  '</div>'+
                                  '<div class="message">'+
                                     '消息<div class="count">3</div>'+
                                  '</div>'+
                                '</div> -->'+
                                '<!-- 登录后结束-->'+
                                '<!-- 登录前 -->'+
                               ' <ul>'+
                                  '<li><a href="javascript:;" id="head_registerBtn" >注册</a></li>'+
                                  '<li><a href="javascript:;" class="this_a" id="head_loginBtn">登录</a></li>'+
                                '</ul>'+
                              '</div>'+
                         ' </div>'+
                          '<!-- 导航 -->'+
                          '<div class="head_bottom">'+
                             '<div class="nav comWidth" id="new">'+
                                '<ul>'+
                                  '<li id="1"><a href="../indexreg2015.12.1/index.html">首页</a></li>'+
                                  '<li id="2"><a href="../indexreg2015.12.1/list.html">海外代购</a></li>'+
                                  '<li id="3"><a href="../indexreg2015.12.1/list.html">国内代购</a></li>'+
                                 ' <li id="4"><a href="javascript:;">实时任务</a></li>'+
                                '</ul>'+
                                '<div id="this_nav"><a href="javascript:;"></a></div>'+
                             '</div>'+
                            
                          '</div>'+
                       '</div>'+
                       '<!-- 头部结束-->');

            // 注册弹出框dom加载
            that.login_frame=$('<!-- 注册弹出框 -->'+
                                '<div class="frame hide" id="register_frame">'+
                                    '<div class="register_frame">'+
                                      '<div class="frame_main">'+
                                        '<div class="logo">'+
                                           
                                        '</div>'+
                                        '<form>'+
                                          '<table>'+
                                            '<tr class="warning"><td></td></tr>'+
                                            '<tr class="firsttr">'+
                                              '<td><input type="text" placeholder="昵称" id="regusername" class="ltext"></td>'+
                                            '</tr>'+
                                            '<tr>'+
                                             ' <td><input type="password" placeholder="密码" id="regpassword" class="ltext"></td>'+
                                            '</tr>'+
                                            '<tr>'+
                                              '<td>'+
                                                '<div class="selectfirst" id="area">大陆'+
                                                 ' <img src="assets/images/slide.png">'+
                                                 ' <div class="select">'+
                                                    '<ul>'+
                                                      '<li>香港</li>'+
                                                      '<li>美国</li>'+
                                                      '<li>新加坡</li>'+
                                                      '<li>台湾</li>'+
                                                    '</ul>'+
                                                  '</div>'+
                                                '</div>'+
                                                '<input type="text" id="regphone" placeholder="常用手机号"  class="stext">'+
                                              '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                              '<td>'+
                                                '<input type="text" placeholder="输入验证码" id="phonevarify" class="stext varify">'+
                                                '<a href="javascript:;" id="phonegetvarify" class="getvarify">获取验证码<span></span></a>'+
                                              '</td>'+
                                            '</tr>'+
                                            '<tr class="lasttr">'+
                                              '<td>'+
                                                '<input type="checkbox">'+
                                                 '<div class="re_pro">我已经同意'+
                                                '<a href="#" id="re_pro">《圈圈人的注册协议》'+
                                                '</a>'+
                                                '</div>'+
                                              '</td>'+
                                            '</tr>'+
                                            '<tr class="lasttr"><td><a href="javascript:;" id="registerBtn" class="frame_Btn">注册</a></td></tr>'+
                                          '</table>'+
                                        '</form>'+
                                        '<p>已有账号  <a href="javascript:;" id="right_login">马上登录</a></span></p>'+
                                      '</div>'+
                                      '<div class="close"><a href="javascript:;" id="close"><img src="assets/images/close.png"></a></div>'+
                                      
                                    '</div>'+
                                '</div>');
            //登录弹出框dom加载
            that.register_frame=$('<!-- 登录框 -->'+
                                    '<div class="frame hide" id="login_frame">'+
                                        '<div class="login_frame">'+
                                          '<div class="frame_main">'+
                                            '<div class="logo"> '+        
                                            '</div>'+
                                            '<form>'+
                                              '<table>'+
                                                '<tr class="warning"><td></td></tr>'+
                                                '<tr class="firsttr">'+
                                                  '<td><input type="text" placeholder="昵称" id="loginusername" class="ltext"></td>'+
                                                '</tr>'+
                                               ' <tr>'+
                                                  '<td><input type="password" placeholder="密码" id="loginpassword" class="ltext"></td>'+
                                                '</tr>'+
                                               ' <tr class="lasttr">'+
                                                  '<td id="fr">'+
                                                     '<div id="forgetpassword"><a href="javascript:;" >忘记密码</a></div>'+
                                                     '<div class="rememberme">'+
                                                      '<input type="checkbox">'+
                                                      '<div class="re_pro">记住我'+
                                                    '</div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                  '</td>'+
                                                '</tr>'+
                                                '<!-- 验证码 -->'+
                                                '<tr class="lasttr" id="textvarify_tr">'+
                                                  '<td>'+
                                                    '<input type="text" placeholder="输入验证码" id="textvarify" class="stext varify">'+
                                                    '<a href="javascript:;" id="textgetvarify" class="getvarify"><img src="http://115.28.133.46:8080/PurchasingProjectNew/securityCode/createCode"></a>'+
                                                  '</td>'+
                                                '</tr>'+
                                                '<tr ><td><a href="javascript:;" id="loginBtn" class="frame_Btn hide">登录</a></td></tr>'+
                                              '</table>'+
                                            '</form>'+
                                           ' <p>没有账号  <a href="javascript:;" id="right_re">立即注册</a></span></p>'+
                                          '</div>'+
                                         ' <div class="close"><a href="javascript:;" id="close"><img src="assets/images/close.png"></a></div>'+
                                          
                                        '</div>'+
                                    '</div>');
            
            // 头部dom插入页面
            $(".wrapper_html").prepend(that.headDom);
            // 插入登录框
             $(".wrapper_html").after(that.login_frame);
            // 插入注册框
             $(".wrapper_html").after(that.register_frame);
        },
  
        frame_close:function(){
            $('.frame').removeClass('lightSpeedIn').addClass('lightSpeedOut animated');
            $('.frame').addClass('hide');
            maskclose();
        },

        // 提醒弹出框弹出
        warning_open:function(){
            $('#warning_frame').removeClass('lightSpeedOut hide').addClass('lightSpeedIn animated');
            maskopen();
        },

        // 登录接口
        login_model:function(){
            var that=this;
            $("#loginBtn").live("click",function(){
                var user_account=$("#loginusername").val();
                var user_psd=$("#loginpassword").val();
                var data=null;
                if (that.loginCount>=2) {//若登录错误次数大于三次，则需要传入验证码
                        $('#login_frame #textvarify_tr').show();
                        var securityCode=$("#textvarify").val();
                        data={
                            "user_account":user_account,
                            "user_psd":user_psd,
                            "loginCount":that.loginCount,
                            "securityCode":securityCode
                        };
                }
               else if(that.loginCount<2){
                        data={
                            "user_account":user_account,
                            "user_psd":user_psd,
                            "loginCount":that.loginCount
                        };
                }
                that.login_model_ajax(data,function($data){

                    var html="";
                        // 成功
                        if ($data.status==1) {
                           that.frame_close();//登录关闭
                           // 顶部状态显示用户信息
                           html="<div class='status'>"+
                                  "<div class='user'>"+
                                    " <img src='"+$data.message.userMsg.user_pic+"'><a href='javascript:;' id='username'>"+$data.message.userMsg.user_name+"</a>"+
                                  "</div>"+
                                  "<div class='message'>消息<div class='count'>3</div>"+
                                  "</div>"+
                                "</div>";
                           $(".login_div").empty().append(html);
                           $(".right .uhead img").attr('src',$data.message.userMsg.user_pic);
                        }
                        // 其他情况
                        else if($data.status<=0){
                            html='<td>'+$data.message.tip+'</td>'
                            $("#login_frame .warning").fadeIn();
                            $("#login_frame .warning").css('display','block');
                            $(".frame table tr.firsttr").css('margin-top','5px');
                            $("#login_frame .warning").empty().append(html);
                            that.loginCount++;//登录错误次数+1
                            console.log(that.loginCount);
                        }
                });

            });
        },

        login_model_ajax:function($param,$fn){
            var that=this;
            $.ajax({
                type: 'GET',
                url: that.server_url +'purchasingLogin/login',
                dataType: 'jsonp',
                data:$param,
                success: function($data){
                    if ($fn){$fn($data);}
                }
            });
        },

        //登录注册基本验证
        login_reg_check:function(){
            $(".frame input").each(function(){
                $(this).blur(function(){//光标离开，看里面是否有值
                    var val=$(this).val();
                    var text= $(this).attr("placeholder");
                    var this_frame=$(this).parents('.frame').attr('id');
                    if(val==""){
                        var html='<td>'+text+'不能为空</td>';
                        $("#"+this_frame+" .warning").fadeIn();
                        $("#"+this_frame+" .warning").css('display','block');
                        $(".frame table tr.firsttr").css('margin-top','5px');
                        $("#"+this_frame+" .warning").empty().append(html);
                    }
                });
                $(this).focus(function(){//光标离开，看里面是否有值
                    var thisid=$(this).attr('id');
                    var this_frame=$(this).parents('.frame').attr('id');
                    var html="";
                    if(thisid=="regusername"){
                        html='<td>昵称格式为密码加数字(长度大于6小于13)</td>';
                    }
                    if (thisid=="regpassword") {
                        html='<td>密码格式为密码加数字(长度大于6小于15)</td>';
                    }
                    $("#"+this_frame+" .warning").fadeIn();
                    $("#"+this_frame+" .warning").css('display','block');
                    $(".frame table tr.firsttr").css('margin-top','5px');
                    $("#"+this_frame+" .warning").empty().append(html);
                });


            });
        },

        // 注册接口
        register_model:function(){
            var that=this;
            $("#registerBtn").live("click",function(){
                var user_account=$("#regusername").val();
                var user_psd=$("#regpassword").val();
                var user_phone=$("#regphone").val();
                var data=null;
                var phoneCode=$("#phonevarify").val();
                data={
                    "account":user_account,
                    "pwd":user_psd,
                    "mobile":user_phone,
                    "code":phoneCode
                };
                that.register_model_ajax(data,function($data){
                    // $data={"messgage":"注册成功","status":1};
                    
                    var html="";
                        // 成功
                        if ($data.status==1) {
                            that.frame_close();//注册关闭
                            // 提醒框显示
                            html='<p>恭喜官人！注册圈圈人成功，马上登录吧<a href="javascript:;" id="regsucceedlogin">立即登录</a></p></div>';
                            $("#warning_frame .warning_content").empty().append(html);
                            that.warning_open();
                            return 0;
                        }
                        // 其他情况
                        else if($data.status<=0){
                            html='<td>'+$data.messgage+'</td>'
                            $("#register_frame .warning").fadeIn();
                            $("#register_frame .warning").css('display','block');
                            $(".frame table tr.firsttr").css('margin-top','5px');
                            $("#register_frame .warning").empty().append(html);
                        }
                });

            });
        },

        register_model_ajax:function($param,$fn){
            var that=this;
            $.ajax({
                type: 'GET',
                url: that.server_url +'register/data',
                dataType: 'jsonp',
                data:$param,
                success: function($data){
                    if ($fn){$fn($data);}
                }
            });
        },

        // 短信倒计时

        seconds:function(){
            var that=this;
            $('#phonegetvarify span').html(that.second);
            if (that.second == 0) {
                html="获取验证码<span></span>";
                $('#phonegetvarify').html(html);
            }
            else {
                setTimeout(function(){
                    that.second--;
                    that.seconds();
                }, 1000);
            }
        },

        // 接收短信接口
        getphone_text:function(){
            var that=this;
            $("#phonegetvarify").live("click",function(){              
                var phoneCode=$("#regphone").val();
                var data={"mobile":phoneCode};
                that.getphone_text_ajax(data,function($data){
                    // 成功
                    var html="";
                    if ($data.status==1) {
                        var s=60;
                        $('#phonegetvarify').empty().append("短信发送成功<span>60</span>");
                        that.seconds();
                    }
                    // 其他提示
                    else if($data.status<=0){
                        html='<td>'+$data.messgage+'</td>'
                        $(".warning").fadeIn();
                        $(".warning").css('display','block');
                        $(".frame table tr.firsttr").css('margin-top','5px');
                        $(".warning").empty().append(html);
                    }
                });

            });
        },

        getphone_text_ajax:function($param,$fn){
            $.ajax({
                type: 'GET',
                url: this.server_url +'verify/getTelCode',
                dataType: 'jsonp',
                data:$param,
                jsonp:"callback",
                success: function($data){
                    if ($fn){$fn($data);}
                },
                error:function(e){
                     console.log(e);
                }
            });
        },

        // 文本验证码切换
        textvarify:function(){
            var that=this;
            $("a#textgetvarify").bind("click",function(){
                var random=Math.floor(Math.random()*50+1);
                $("#textgetvarify img").attr("src","http://115.28.133.46:8080/PurchasingProjectNew/securityCode/createCode?"+random); 

            });
        },

        // 顶部登录点击事件
        headlogin_click:function(){
            var that=this;
            $("#head_loginBtn").live("click",function(){
            console.log(that.loginCount);
            if (that.loginCount>=2) {
                var html="";
                html='<tr class="lasttr">'+
                      '<td>'+
                        '<input type="text" placeholder="输入验证码" id="textvarify" class="stext varify">'+
                        '<a href="javascript:;" id="textgetvarify" class="getvarify"><img src="http://115.28.133.46:8080/PurchasingProjectNew/securityCode/createCode"></a>'+
                      '</td>'+
                    '</tr>';
                 $('#login_frame #textvarify_tr').show();
                 $('#login_frame #textvarify_tr').empty().append(html);
            }
            maskopen();
            $('#login_frame').removeClass('lightSpeedOut hide').addClass('lightSpeedIn animated');
            setTimeout(function() {$('#login_frame #loginBtn').removeClass('bounceOut hide').addClass('bounceIn animated');},1000);
            });
        },

        //顶部注册点击事件
        headregister_click:function(){
             // 顶部登录注册
            $("#head_registerBtn").live("click",function(){
                maskopen();
                $('#register_frame').removeClass('lightSpeedOut hide').addClass('lightSpeedIn animated');
                setTimeout(function() {$('#register_frame #registerBtn').removeClass('bounceOut hide').addClass('bounceIn animated');},1000);
            });

        },

        // 注册登录点击各种效果
        registerPhone_click:function(){
           // 手机号码展开地点
            $(".selectfirst").live("mouseover",function(){
                $(".select").slideDown("fast");
                return false;
            });
            $(document).on("mouseleave",":not('.select,.selectfirst')",function(e){
                var target  = $(e.target);
                if(target.closest(".select").length == 0){
                    $(".select").slideUp("fast");
                };
                e.stopPropagation();
            });
            // 马上登录马上注册效果
            $("#right_login,#regsucceedlogin").live("click",function(){
                 $('.frame').removeClass('lightSpeedIn').addClass('lightSpeedOut animated hide');
                 $('#login_frame').removeClass('lightSpeedOut hide').addClass('lightSpeedIn animated');
                 $('#register_frame #registerBtn').removeClass('bounceIn').addClass('bounceOut hide');
                 setTimeout(function() {$('#login_frame #loginBtn').removeClass('bounceOut hide').addClass('bounceIn animated');},1000);
            });
            $("#right_re").live("click",function(){
                 $('.frame').removeClass('lightSpeedIn').addClass('lightSpeedOut animated hide');;
                 $('#register_frame').removeClass('lightSpeedOut hide').addClass('lightSpeedIn animated');
                 $('#login_frame #loginBtn').removeClass('bounceIn').addClass('bounceOut hide');
                 setTimeout(function() {$('#register_frame #registerBtn').removeClass('bounceOut hide').addClass('bounceIn animated');},1000);
            });
        }

    }});
})(jQuery)

$(function(){
    $.header.init();
    // 关闭
    $(".close").bind("click",function(){
        $('.frame').removeClass('lightSpeedIn').addClass('lightSpeedOut animated');
        setTimeout(function() {$('.frame').addClass('hide');},1000);
        maskclose();
    });

});

  