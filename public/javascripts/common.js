$(function(){
    $('#HEADER .nav .menu').on('mouseover', function() {
        var subMenus = $(this).find('.subMenus');
        var mainWidth = $(this).outerWidth();
        var subWidth = $(subMenus).outerWidth();
        var left = (subWidth - mainWidth) / 2;
        $(subMenus).fadeIn(300).css({
            left: -left
        });
    }).on('mouseleave', function() {
        $(this).find('.subMenus').fadeOut(300);
    })
})