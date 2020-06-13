$(function(){
    // 产品业务点击展开详情
    $('#businessList .item').on('click', function(e) {
        e.stopPropagation();
        $(this).siblings().removeClass('open');
        $(this).addClass('open');
        if (GLOBAL.getDeviceType() != 'mobile') {
            $('#container').animate({
                scrollTop: $('#container').scrollTop() + $(this).offset().top
            }, 300);
        } else {
            var hock = $(this).attr('id');
            window.location.hash = '#' + hock;
        }
        // $(this).siblings().removeClass('open').find('.detail').slideUp(400);
        // $(this).addClass('open').find('.detail').slideDown(400);
    });
    // 产品业务点击关闭展开详情
    $('#businessList .item .detail .closeBtn').on('click', function(e) {
        e.stopPropagation();
        $(this).parent().parent().removeClass('open');
        // $(this).parent().slideUp(400, function() {
        //     $(this).parent().removeClass('open');
        // });
    });
});