new Vue({
    el: '#APP',
    data: function () {
        return {
            loading: false,
            listData: [],
            dialogVisible: false,
            formData: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        add: function() {
            this.dialogVisible = true;
        },
        batchDelete: function() {

        },
        refresh: function() {
            this.getUsers();
        },
        save: function() {
            this.dialogVisible = false;
        },
        getUsers: function() {
            this.loading = true;
            var _this = this;
            this.$util.ajax({
                url: '/user/manager/list',
                type: 'post',
                success: function(res) {
                    _this.loading = false;
                    if (res.code == 200) {
                        _this.listData = res.data;
                    }
                }
            })
        }
    },
    mounted: function () {
        this.getUsers();
    }
})