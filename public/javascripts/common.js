var t_resizeWin;
var GLOBAL = {
    /**
     * 获取设备类型
    */
    getDeviceType: function() {
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
    resizeWin: function(callback) {// param1: 调整后回调
        clearTimeout(t_resizeWin);
        t_resizeWin = setTimeout(function() {
            var type = GLOBAL.getDeviceType();
            if (typeof callback == 'function') {
                callback(type);
            }
        }, 300);
    }
};

$(function(){
    // 窗口大小调整
    window.onresize = function() {
        GLOBAL.resizeWin();
    }
    // 触发窗口大小调整
    GLOBAL.resizeWin();

    // 顶部菜单悬停事件
    $('#HEADER .nav .menu').on('mouseover', function() {
        if (!$('body').hasClass('mobile')) {
            var subMenus = $(this).find('.subMenus');
            var mainWidth = $(this).outerWidth();
            var subWidth = $(subMenus).outerWidth();
            var left = (subWidth - mainWidth) / 2;
            $(subMenus).fadeIn(300).css({
                left: -left
            });
        }
    }).on('mouseleave', function() {
        if (!$('body').hasClass('mobile')) {
            $(this).find('.subMenus').fadeOut(300);
        }
    })

    // 顶部菜单点击事件
    $('#HEADER .nav .menu .mainMenu').on('click', function() {
        if ($('body').hasClass('mobile')) {
            $(this).parent().siblings().find('.mainMenu').removeClass('open').siblings('.subMenus').slideUp(300);
            $(this).toggleClass('open').siblings('.subMenus').css({
                left: 0
            }).slideToggle(300);
        }
    });

    // 顶部菜单展开事件
    $('#HEADER .menuEntry_mobile').on('click', function() {
        $(this).toggleClass('open');
        $('#HEADER .nav').toggleClass('show');
    });


    $('#container').scroll(function(e) {
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
    $('#FLOATSITE .top .wrap').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#container').animate({
            scrollTop: 0
        }, 300);
    }).on('mouseover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var text = {
            cn: '返回顶部',
            hk: '返回頂部',
            en: 'back to top'
        }
        $('#FLOATSITE .tips span').text(text[$('body').attr('data-lang')]).css('display', 'block');
    }).on('mouseleave', function(e) {
        $('#FLOATSITE .tips span').css('display', 'none');
    });
    $('#FLOATSITE .next .wrap').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#container').animate({
            scrollTop: $('#container').scrollTop() + document.body.clientHeight
        }, 300);
    }).on('mouseover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var text = {
            cn: '下一页',
            hk: '下一頁',
            en: 'next page'
        }
        $('#FLOATSITE .tips span').text(text[$('body').attr('data-lang')]).css('display', 'block');
    }).on('mouseleave', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#FLOATSITE .tips span').css('display', 'none');
    });
})