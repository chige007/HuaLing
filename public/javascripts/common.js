var t_resizeWin;
var GLOBAL = {
    /**
     * 获取设备类型
     */
    getDeviceType: function () {
        var type = '';
        if (document.body.clientWidth <= 650) {
            $('body').addClass('mobile').removeClass('pc pad');
            type = 'mobile';
        } else if (document.body.clientWidth > 650 && document.body.clientWidth <= 768) {
            $('body').addClass('pad').removeClass('mobile pc');
            type = 'pad';
        } else {
            $('body').addClass('pc').removeClass('mobile pad');
            type = 'pc';
        }
        return type;
    },
    /**
     * 窗口大小调整事件
     */
    resizeWin: function (callback) { // param1: 调整后回调
        clearTimeout(t_resizeWin);
        t_resizeWin = setTimeout(function () {
            var type = GLOBAL.getDeviceType();
            if (typeof callback == 'function') {
                callback(type);
            }
        }, 300);
    },
    myExplorer: function () {
        var explorer = window.navigator.userAgent, myexplorer = '';
        if (explorer.indexOf("QQBrowser") >= 0 || explorer.indexOf("QQ") >= 0) {
            myexplorer = "腾讯QQ";
        } else if (explorer.indexOf("Safari") >= 0 && explorer.indexOf("MetaSr") >= 0) {
            myexplorer = "搜狗";
        } else if (!!window.ActiveXObject || "ActiveXObject" in window) { //IE
            if (!window.XMLHttpRequest) {
                myexplorer = "IE6";
            } else if (window.XMLHttpRequest && !document.documentMode) {
                myexplorer = "IE7";
            } else if (!-[1, ] && document.documentMode && !("msDoNotTrack" in window.navigator)) {
                myexplorer = "IE8";
            } else { //IE9 10 11
                var hasStrictMode = (function () {
                    "use strict";
                    return this === undefined;
                }());
                if (hasStrictMode) {
                    if (!!window.attachEvent) {
                        myexplorer = "IE10";
                    } else {
                        myexplorer = "IE11";
                    }
                } else {
                    myexplorer = "IE9";
                }
            }
        } else { //非IE
            if (explorer.indexOf("LBBROWSER") >= 0) {
                myexplorer = "猎豹";
            } else if (explorer.indexOf("360ee") >= 0) {
                myexplorer = "360极速浏览器";
            } else if (explorer.indexOf("360se") >= 0) {
                myexplorer = "360安全浏览器";
            } else if (explorer.indexOf("se") >= 0) {
                myexplorer = "搜狗浏览器";
            } else if (explorer.indexOf("aoyou") >= 0) {
                myexplorer = "遨游浏览器";
            } else if (explorer.indexOf("qqbrowser") >= 0) {
                myexplorer = "QQ浏览器";
            } else if (explorer.indexOf("baidu") >= 0) {
                myexplorer = "百度浏览器";
            } else if (explorer.indexOf("Firefox") >= 0) {
                myexplorer = "火狐";
            } else if (explorer.indexOf("Maxthon") >= 0) {
                myexplorer = "遨游";
            } else if (explorer.indexOf("Chrome") >= 0) {
                myexplorer = "谷歌（或360伪装）";
            } else if (explorer.indexOf("Opera") >= 0) {
                myexplorer = "欧朋";
            } else if (explorer.indexOf("TheWorld") >= 0) {
                myexplorer = "世界之窗";
            } else if (explorer.indexOf("Safari") >= 0) {
                myexplorer = "苹果";
            } else {
                myexplorer = "其他";
            }
        }
        return {
            userAgent: explorer,
            result: myexplorer
        };
    }
};

$(function () {
    // 窗口大小调整
    window.onresize = function () {
        GLOBAL.resizeWin();
    }
    // 触发窗口大小调整
    GLOBAL.resizeWin();

    // 顶部菜单悬停事件
    $('#HEADER .nav .menu').on('mouseover', function () {
        if (!$('body').hasClass('mobile')) {
            var subMenus = $(this).find('.subMenus');
            var mainWidth = $(this).outerWidth();
            var subWidth = $(subMenus).outerWidth();
            var left = (subWidth - mainWidth) / 2;
            $(subMenus).fadeIn(300).css({
                left: -left
            });
        }
    }).on('mouseleave', function () {
        if (!$('body').hasClass('mobile')) {
            $(this).find('.subMenus').fadeOut(300);
        }
    })

    // 顶部菜单点击事件
    $('#HEADER .nav .menu .mainMenu').on('click', function () {
        if ($('body').hasClass('mobile')) {
            $(this).parent().siblings().find('.mainMenu').removeClass('open').siblings('.subMenus').slideUp(300);
            $(this).toggleClass('open').siblings('.subMenus').css({
                left: 0
            }).slideToggle(300);
        }
    });

    // 顶部菜单展开事件
    $('#HEADER .menuEntry_mobile').on('click', function () {
        $(this).toggleClass('open');
        $('#HEADER .nav').toggleClass('show');
        var video = document.getElementById('myVideo');
        if ($(this).hasClass('open')) {
            video.pause();
            $('#myVideo').css('display', 'none');
            // $('#videoImg').css('display', 'block');
        } else {
            // video.play();
            $('#myVideo').css('display', 'block');
            // $('#videoImg').css('display', 'none');
        }
    });


    $('#container').scroll(function (e) {
        // e.stopPropagation();
        // e.preventDefault();
        var scrollTop = e.target.scrollTop;
        var clientHeight = e.target.clientHeight;
        var scrollHeight = e.target.scrollHeight;

        // $('.g-bigTitle .text').text(scrollTop + ',' + clientHeight + ',' + scrollHeight);
        if (scrollTop + clientHeight == scrollHeight) {
            $('#FLOATSITE .next .wrap').fadeOut(400);
        } else {
            $('#FLOATSITE .next .wrap').fadeIn(400);
        }
        if (scrollTop > 120) {
            $('#FLOATSITE .top .wrap').fadeIn(400);
        } else {
            $('#FLOATSITE .top .wrap').fadeOut(400);
        }
    });
    $('#FLOATSITE .top .wrap').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('#container').animate({
            scrollTop: 0
        }, 300);
    }).on('mouseover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var text = {
            cn: '返回顶部',
            hk: '返回頂部',
            en: 'back to top'
        }
        $('#FLOATSITE .tips span').text(text[$('body').attr('data-lang')]).css('display', 'block');
    }).on('mouseleave', function (e) {
        $('#FLOATSITE .tips span').css('display', 'none');
    });
    $('#FLOATSITE .next .wrap').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('#container').animate({
            scrollTop: $('#container').scrollTop() + document.body.clientHeight
        }, 300);
    }).on('mouseover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var text = {
            cn: '下一页',
            hk: '下一頁',
            en: 'next page'
        }
        $('#FLOATSITE .tips span').text(text[$('body').attr('data-lang')]).css('display', 'block');
    }).on('mouseleave', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('#FLOATSITE .tips span').css('display', 'none');
    });
})