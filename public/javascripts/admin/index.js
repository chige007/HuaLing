document.body.onload = function () {
    new Vue({
        el: '#APP',
        data: function () {
            return {
                visible: false
            }
        },
        methods: {
            /**
             * 头部栏菜单点击事件
             *
             * @auther: 陈宇驰
             * @date: 2020-06-05 00:23:36
            */
            handleHeaderMenu: function(key, keyPath) {
                if (key == '0-1') {
                    console.log('登出')
                    window.location.href = '/user/logout';
                }
            },
            handleMenuSelect: function(key, keyPath) {
                window.location.href = '/admin/' + key;
            }
        },
        mounted: function () {
        }
    })
}