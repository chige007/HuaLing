var t_resizeWin;
var GLOBAL = {
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
    resizeWin: function(callback) {
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
    
    window.onresize = function() {
        GLOBAL.resizeWin();
    }

    GLOBAL.resizeWin();

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

    $('#HEADER .nav .menu .mainMenu').on('click', function() {
        if ($('body').hasClass('mobile')) {
            $(this).parent().siblings().find('.mainMenu').removeClass('open').siblings('.subMenus').slideUp(300);
            $(this).toggleClass('open').siblings('.subMenus').css({
                left: 0
            }).slideToggle(300);
        }
    });

    $('#HEADER .menuEntry_mobile').on('click', function() {
        $(this).toggleClass('open');
        $('#HEADER .nav').toggleClass('show');
    });

})