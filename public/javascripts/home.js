$(function(){
    var currentIndex;
    var slide = function(index) {
        var clientWidth = document.body.clientWidth;
        var imgWidth = Math.ceil(clientWidth * 0.68);
        var length =  $('#workImgs').find('.imgWrap')
                                    .removeClass('current').css({
                                        width: imgWidth + 'px'
                                    }).each(function(i, e) {
                                        if (!$(e).attr('data-index'))
                                            $(e).attr('data-index', i + '');
                                    }).length;
        if (index == length) index = 0;
        if (index == -1) index = length - 1;
        currentIndex = index;
        var img = function(index) {
            return $('#workImgs').find('.imgWrap[data-index="' + index + '"]');
        };
        var currentImg = $(img(index)).addClass('current');
        var parentWrap = $(currentImg).parent();
        var prevImg = $(currentImg).prev();
        var nextImg = $(currentImg).next();
        if (!prevImg.length) {
            var prevIndex = index - 1;
            if (prevIndex == -1) prevIndex = length - 1;
            prevImg = img(prevIndex);
            $(prevImg).prependTo(parentWrap);
            $(parentWrap).css({
                'margin-left': (($(parentWrap).css('margin-left').match(/\d/g).join('') * 1 + imgWidth) * -1) + "px"
            });
        }
        if (!nextImg.length) {
            var nextIndex = index + 1;
            if (nextIndex == length) nextIndex = 0;
            nextImg = img(nextIndex);
            $(nextImg).appendTo(parentWrap);
            $(parentWrap).css({
                'margin-left': (($(parentWrap).css('margin-left').match(/\d/g).join('') * 1 - imgWidth) * -1) + "px"
            });
        }
        var shouldLeft = ($(currentImg).index('.imgWrap') - 1) * imgWidth + (imgWidth - Math.ceil(clientWidth * 0.16));
        $(parentWrap).animate({
            'margin-left': (shouldLeft * -1) + "px"
        }, 400);
    };
    var resizeWin = function() {
        GLOBAL.resizeWin(function(type) {
            if (type == 'mobile') {
                slide(0);
            } else {
                $('#workImgs').find('.imgsWrap').css({
                    'margin-left': '0px'
                }).find('.imgWrap').css({
                    width: '33.33%'
                });
            }
        });
    }
    window.onresize = function() {
        resizeWin();
    }
    resizeWin();

    $('#workImgs').find('.nextBtn').on('click', function() {
        slide(currentIndex + 1);
    });
    $('#workImgs').find('.prevBtn').on('click', function() {
        slide(currentIndex - 1);
    });
    $('#workImgs .imgsWrap').on('touchstart', function(e) {
        if (GLOBAL.getDeviceType() != 'mobile') return;
        var touch = e.originalEvent,
        startX = touch.changedTouches[0].pageX;
        startY = touch.changedTouches[0].pageY;
        slider = $(this);
        slider.on('touchmove', function(e) {
            e.preventDefault();
            touch = e.originalEvent.touches[0] ||
                e.originalEvent.changedTouches[0];
            if (touch.pageX - startX > 15) {
                slider.off('touchmove');
                slide(currentIndex - 1);
            } else if (touch.pageX - startX < - 15) {
                slider.off('touchmove');
                slide(currentIndex + 1);
            }
        });
        return false;

    }).on('touchend', function() {
        if (GLOBAL.getDeviceType() != 'mobile') return;
        $(this).off('touchmove');
    });
});