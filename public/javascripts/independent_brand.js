
$(function(){
    $('#businessList .item').on('click', function(e) {
        e.stopPropagation();
        $(this).siblings().removeClass('open').find('.detail').slideUp(400);
        $(this).addClass('open').find('.detail').slideDown(400);
    });

    $('#businessList .item .detail .closeBtn').on('click', function(e) {
        e.stopPropagation();
        $(this).parent().slideUp(400, function() {
            $(this).parent().removeClass('open');
        });
    });
});