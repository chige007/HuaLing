$(function(){
    var t_resizeWin;
    var resizeWin = function() {
        clearTimeout(t_resizeWin);
        t_resizeWin = setTimeout(function() {
            if (document.body.clientWidth <= 650) {
                $('body').addClass('mobile').removeClass('pc pad');
            } else if (document.body.clientWidth > 650 && document.body.clientWidth <= 768) {
                $('body').addClass('pad').removeClass('mobile pc');
            } else {
                $('body').addClass('pc').removeClass('mobile pad');
            }
        }, 300);
    }
    window.onresize = function() {
        resizeWin();
    }
    resizeWin();

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
            $(this).parent().siblings().find('.mainMenu').removeClass('open').siblings('.subMenus').slideUp();
            $(this).toggleClass('open').siblings('.subMenus').slideDown();
        }
    });

    $('#HEADER .menuEntry_mobile').on('click', function() {
        $(this).toggleClass('open');
        $('#HEADER .nav').toggleClass('show');
    })
})