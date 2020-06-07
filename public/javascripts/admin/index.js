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
                    window.location.href = '/user/logout';
                }
            },
            handleMenuSelect: function(key, keyPath) {
                // var _this = this;
                // var url = '/admin/module/' + key;
                // Util.ajax({
                //     url: url,
                //     dataType: 'text',
                //     contentType: 'application/text',
                //     success: function(res) {
                //         debugger;
                //         _this.$refs.view.$el.innerHTML = res;
                //         var script, scripts;
                //         scripts = [];
                //         var regexp = /<script[^>]*>([\s\S]*?)<\/script>/gi;
                //         while ((script = regexp.exec(res))) scripts.push(script[1]);
                //         scripts = scripts.join('\n');
                //         if (scripts) (window.execScript) ? window.execScript(scripts) : window.setTimeout(scripts, 0);
                //     }
                // })
                window.location.href = '/admin/index/' + key;
            }
        },
        mounted: function () {
        }
    })
}