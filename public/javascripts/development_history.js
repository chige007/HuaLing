$(function(){
    var onWinResize = function(type) {
        console.log(type);
        if (type == 'mobile') {
            $('.imgList.mobile').css('display', 'block');
            $('.imgList.pc').css('display', 'none');
        } else {
            $('.imgList.pc').css('display', 'block');
            $('.imgList.mobile').css('display', 'none');
        }
    }

    // 窗口大小调整
    window.onresize = function() {
        onWinResize(GLOBAL.getDeviceType());
    }

    onWinResize(GLOBAL.getDeviceType());
});