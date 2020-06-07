document.body.onload = function () {
    new Vue({
        el: '#APP',
        data: function () {
            return {
                loading: false,
                requestMsg: '',
                t_requestMsg: null,
                rememberPwd: false,
                username: '',
                password: ''
            }
        },
        methods: {
            msgShow: function(msg) {
                var _this = this;
                clearTimeout(this.t_requestMsg);
                this.requestMsg = msg;
                this.t_requestMsg = setTimeout(function() {
                    _this.$set(_this.$data, 'requestMsg', '');
                }, 3000);
            },
            /**
             * 登录
             *
             * @auther: 陈宇驰
             * @date: 2020-06-04 21:17:06
            */
            login: function() {
                if (!this.username) {
                    this.msgShow('请输入用户名');
                    return;
                }
                if (!this.password) {
                    this.msgShow('请输入密码');
                    return;
                }
                this.loading = true;
                var _this = this;
                Util.ajax({
                    type: 'POST',
                    url: '/user/login',
                    data: {
                        username: this.username.trim(),
                        password: this.password.trim()
                    },
                    success: function(res) {
                        _this.loading = false;
                        if (res.code != 200) {
                            _this.msgShow(res.msg);
                        } else {
                            if (_this.rememberPwd) {
                                Util.setCookie('username', _this.username, 1);
                                Util.setCookie('password', _this.password, 1);
                            } else {
                                Util.removeCookie('username');
                                Util.removeCookie('password');
                            }
                            window.location.href = '/admin/index/home';
                        }
                    },
                    error: function(err) {
                        _this.msgShow('登录失败');
                        console.log(err);
                    }
                })
            }
        },
        mounted: function () {
            this.username = Util.getCookie('username') || '';
            this.password = Util.getCookie('password') || '';
            if (Util.getCookie('username')) {
                this.rememberPwd = true;
            }

            if (window.location.href.indexOf('noSession=1') != -1) {
                this.msgShow('请先登录');
            }
            if (window.location.href.indexOf('timeout=1') != -1) {
                this.msgShow('登录超时，请重新登录');
            }
        }
    })
}