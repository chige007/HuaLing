new Vue({
    el: '#APP',
    data: function () {
        return {
            loading: false,
            listData: [],
            page: 1,
            pageSize: 10,
            keyword: '',
            total: 0,
            dialogVisible: false,
            formDisabled: false,
            selection: [],
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
                },
                happenTime: new Date()
            },
            formRules: {
                'cn.title': [{
                    required: true,
                    message: '请输入中文简体版本的新闻标题',
                    trigger: 'blur'
                }],
                'en.title': [{
                    required: true,
                    message: '请输入英文版本的新闻标题',
                    trigger: 'blur'
                }],
                'hk.title': [{
                    required: true,
                    message: '请输入中文繁体版本的新闻标题',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        /**
         * 新增
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        add: function () {
            this.formDisabled = false;
            this.dialogVisible = true;
        },
        /**
         * 查看/编辑
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        check: function (row, type) {
            this.formDisabled = type == 'check' ? true : false;
            this.dialogVisible = true;
            var formData = this.$util.objectCopy(row);
            for (var x in this.formData) {
                this.$set(this.formData, x, formData[x]);
            }
        },
        deleteNews: function (id) {
            var _this = this;
            var filter = {};
            if (typeof id == 'string') {
                filter._id = id;
            } else if (Array.isArray(id)) {
                filter._id = {
                    $in: id
                }
            } else {
                return;
            }
            this.loading = true;
            this.$util.ajax({
                url: '/news/delete',
                data: filter,
                type: 'POST',
                success: function (res) {
                    this.loading = false;
                    _this.$util.log.success(_this, '删除成功');
                    _this.refresh();
                }
            });
        },
        /**
         * 删除单个
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        singleDelete: function (id) {
            var _this = this;
            this.$util.confirm(this, '是否确定删除？', function () {
                _this.deleteNews(id);
            });
        },
        /**
         * 批量删除
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        batchDelete: function () {
            var _this = this;
            if (!this.selection.length) {
                this.$util.log.warn(this, '请选择要删除的记录');
            } else {
                this.$util.confirm(this, '是否确定删除所选记录？', function () {
                    var ids = [];
                    _this.selection.forEach(elem => {
                        ids.push(elem._id);
                    });
                    _this.deleteNews(ids);
                });
            }
        },
        /**
         * 发布
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        publish: function (id, status) {
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
                success: function (res) {
                    _this.loading = false;
                    _this.$util.log.success(_this, status == 0 ? '撤回成功' : '发布成功');
                    _this.refresh();
                }
            });
        },
        /**
         * 刷新
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        refresh: function () {
            this.getNews();
        },
        /**
         * 保存
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        save: function () {
            var _this = this;
            this.$refs.form.validate(function (valid) {
                if (!valid) {
                    return;
                } else {
                    var loading = _this.$loading({
                        lock: true,
                        spinner: 'el-icon-loading',
                    });
                    var formData = Object.assign({}, _this.formData);
                    delete formData._id;
                    if (!_this.formData._id) { // 新增
                        _this.$util.ajax({
                            url: '/news/add',
                            type: 'POST',
                            data: formData,
                            success: function (res) {
                                loading.close();
                                _this.$util.log.success(_this, '保存成功');

                                _this.refresh();
                                _this.dialogVisible = false;
                            }
                        });
                    } else { // 修改
                        _this.$util.ajax({
                            url: '/news/update',
                            type: 'POST',
                            data: {
                                filter: {
                                    _id: _this.formData._id
                                },
                                data: formData
                            },
                            success: function (res) {
                                loading.close();
                                _this.$util.log.success(_this, '保存成功');
                                _this.refresh();
                                _this.dialogVisible = false;
                            }
                        });
                    }
                }
            });
        },
        /**
         * 获取新闻列表
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        getNews: function (page, pageSize) {
            console.log(123);
            this.loading = true;
            var _this = this;
            var filter = {};
            if (this.keyword) {
                filter = {
                    $or: [{
                        'cn.title': {
                            '$regex': this.keyword
                        }
                    }, {
                        'cn.content': {
                            '$regex': this.keyword
                        }
                    }]
                }
            }
            var limit = pageSize || this.pageSize;
            var skip = page || this.page;
            skip = (skip - 1) * limit;
            this.$util.ajax({
                url: '/news/list',
                type: 'post',
                data: {
                    filter: filter,
                    options: {
                        skip: skip,
                        limit: limit
                    }
                },
                success: function (res) {
                    _this.loading = false;
                    if (res.code == 200) {
                        _this.$set(_this.$data, 'listData', res.data.rows);
                        _this.$set(_this.$data, 'total', res.data.total);
                    }
                }
            })
        },
        /**
         * 状态格式化
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        statusFormatter: function (row, col, value) {
            if (value == 0) {
                return '未发布';
            } else if (value == 1) {
                return '已发布'
            }
        },
        /**
         * 初始化数据
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        initData: function () {
            this.$refs.form.clearValidate();
            this.formData = {
                _id: '',
                happenTime: new Date(),
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
        },
        /**
         * 列表选择事件
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        selectionChange: function (selection) {
            this.selection = selection;
        },
        /**
         * 单页条数切换事件
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        sizeChange: function (size) {
            this.pageSize = size;
            this.refresh();
        },
        /**
         * 页码切换事件
         *
         * @param:  
         * @auther: 陈宇驰
         * @date: 2020-06-08 17:01:08
         */
        currentChange: function (page) {
            this.page = page;
            this.refresh();
        }
    },
    mounted: function () {
        this.getNews();
    }
})