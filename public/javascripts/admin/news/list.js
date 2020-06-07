new Vue({
    el: '#APP',
    data: function () {
        return {
            loading: false,
            listData: [],
            page: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            tabName: 'cn',
            formDisabled: false,
            formData: {
                _id: '',
                cn: {
                    title: '',
                    content: ''
                },
                en: {
                    title: '',
                    content: ''
                },
                hk: {
                    title: '',
                    content: ''
                }
            }
        }
    },
    methods: {
        add: function() {
            this.formDisabled = false;
            this.dialogVisible = true;
        },
        check: function(row, type) {
            this.formDisabled = type == 'check' ? true : false;
            this.dialogVisible = true;
            var formData = Object.assign({}, row);
            for (var x in this.formData) {
                this.$set(this.formData, x, formData[x]);
            }
        },
        deleteNews: function(id){
            var _this = this;
            this.$util.confirm(this, '是否确定删除？', function() {
                _this.loading = true;
                _this.$util.ajax({
                    url: '/news/delete',
                    data: {
                        _id: id
                    },
                    type: 'POST',
                    success: function(res) {
                        this.loading = false;
                        _this.$util.log.success(_this, '删除成功');
                        _this.refresh();
                    }
                });
            });
        },
        batchDelete: function() {

        },
        publish: function(id, status) {
            this.loading = true;
            var _this = this;
            this.$util.ajax({
                url: '/news/publish',
                data: {
                    filter: {
                        _id: id
                    },
                    data: {
                        status: status
                    }
                },
                type: 'POST',
                success: function(res) {
                    _this.loading = false;
                    _this.$util.log.success(_this, status == 0 ? '撤回成功' : '发布成功');
                    _this.refresh();
                }
            });
        },
        refresh: function() {
            this.getNews();
        },
        save: function() {
            var _this = this;
            var formData = Object.assign({}, this.formData);
            delete formData._id;
            console.log(formData);
            if (!this.formData._id) {
                this.$util.ajax({
                    url: '/news/add',
                    type: 'POST',
                    data: formData,
                    success: function(res) {
                        _this.$util.log.success(_this, '保存成功');
                        _this.refresh();
                    }
                });
            } else {
                this.$util.ajax({
                    url: '/news/update',
                    type: 'POST',
                    data: {
                        filter: {
                            _id: this.formData._id
                        },
                        data: formData
                    },
                    success: function(res) {
                        _this.$util.log.success(_this, '保存成功');
                        _this.refresh();
                    }
                });
            }
            this.dialogVisible = false;
        },
        getNews: function() {
            this.loading = true;
            var _this = this;
            this.$util.ajax({
                url: '/news/list',
                type: 'post',
                success: function(res) {
                    _this.loading = false;
                    if (res.code == 200) {
                        _this.$set(_this.$data, 'listData', res.data.rows);
                        _this.$set(_this.$data, 'total', res.data.total);
                    }
                }
            })
        },
        statusFormatter: function(row, col, value) {
            if (value == 0) {
                return '未发布';
            } else if (value == 1) {
                return '已发布'
            }
        },
        initData: function() {
            this.tabName = 'cn';
            this.formData = {
                _id: '',
                cn: {
                    title: '',
                    content: ''
                },
                en: {
                    title: '',
                    content: ''
                },
                hk: {
                    title: '',
                    content: ''
                }
            }
        }
    },
    mounted: function () {
        this.getNews();
    }
})