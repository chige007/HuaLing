var Util = {
    /**
     * 获取当前时间yyyy-MM-dd HH:mm
     *
     * @auther: 陈宇驰
     * @date: 29/8/19 下午3:26
     */
    getCurrentDate: function() {
        var d = new Date();
        var year = d.getFullYear() + '';
        var month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = d.getDate();
        day = day < 10 ? '0' + day : day;
        var hour = d.getHours();
        var minute = d.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    },
    /**
     * 重置表单
     *
     * @param: {Object}vue vue作用域
     * @param: {String}formName form组件名
     * @auther: 陈宇驰
     * @date: 21/6/19 下午2:58
     */
    resetForm: function(vue, formName) {
        vue.$refs[formName].resetFields();
        vue.$refs[formName].clearValidate();
    },
    /**
     * 表单验证
     *
     * @param: {Object}vue对象
     * @param: {Object}formName form名
     * @param: {Function}success 验证成功回调
     * @param: {Function}error 验证失败回调
     * @auther: 陈宇驰
     * @date: 2019-12-23 15:11:20
     */
    validForm: function(vue, formName, success, error) {
        vue.$refs[formName].validate(valid => {
            if (valid && typeof success == 'function') { // 表单验证通过
                success();
            } else {
                this.log.error(vue, '请完整填写表单');
                if (typeof error == 'function') error();
                return false;
            }
        });
    },
    ajax: function(options){
        options = options ||{};  //调用函数时如果options没有指定，就给它赋值{}, 一个空的Object
        options.type = (options.type || "GET").toUpperCase();/// 请求格式GET、POST，默认为GET
        options.dataType = (options.dataType || "json").toUpperCase();    //响应数据格式，默认json
    
        var params = options.data;//options.data请求的数据
    
        var xhr;
    
        //考虑兼容性
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else if(window.ActiveObject){//兼容IE6以下版本
            xhr = new ActiveXobject('Microsoft.XMLHTTP');
        }
    
        //启动并发送一个请求
        if(options.type == "GET"){
            params = this.formatParams(options.params);
            xhr.open("GET", options.url+"?" + params, true);
            xhr.send(null);
        }else if(options.type == "POST"){
            params = JSON.stringify(params);
    
            xhr.open("post", options.url, true);
    
            //设置表单提交时的内容类型
            //Content-type数据请求的格式
            xhr.setRequestHeader("Content-type",  options.contentType || "application/json");
            xhr.send(params);
        }
    
    //    设置有效时间
        setTimeout(function(){
            if(xhr.readySate != 4){
                xhr.abort();
            }
        }, options.timeout || 60000)
    
    //    接收
    //     options.success成功之后的回调函数  options.error失败后的回调函数
    //xhr.responseText, xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var status = xhr.status;
                if(status >= 200 && status < 300 || status == 304){
                    var response = xhr.responseText;
                    if (options.dataType == 'JSON') {
                        try {
                            response = JSON.parse(response);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                  options.success && options.success(response, xhr.responseXML);
                }else{
                    options.error && options.error(status);
                }
            }
        }
    },
    /**
     * 格式化请求数据
     *
     * @param: {Object} data 请求数据
     * @auther: 陈宇驰
     * @date: 2020-06-04 23:34:16
    */
    formatParams: function(data){
        var arr = [];
        for(var name in data){
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    },
    /**
     * 设置cookie值
     *
     * @param: {String}cname cookie名
     * @param: {String}cvalue cookie值
     * @param: {String}exdays 保存期限
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    setCookie: function(cname, value, iDay) {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = cname + '=' + value + ';expires=' + oDate;
    },
    /**
     * 获取cookie值
     *
     * @param: {String}cname cookie名
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    getCookie: function(cname) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (cname == arr[0]) {
                return arr[1];
            }
        }
        return "";
    },
    /**
     * 删除cookie值
     *
     * @param: {String}cname cookie名
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    removeCookie: function (cname) {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + -1);
        document.cookie = cname + '=' + 1 + ';expires=' + oDate;
    },
    /**
     * 设置localStorage
     *
     * @param: {String}name 名
     * @param: {String}value 值
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    setLocalStorage: function(name, value) {
        if (window.Storage && window.localStorage && window.localStorage instanceof Storage) { // 支持本地存储
            window.localStorage.setItem(name, value);
            return true;
        }
        return false;
    },
    /**
     * 获取localStorage
     *
     * @param: {String}name 名
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    getLocalStorage: function(name) {
        if (window.Storage && window.localStorage && window.localStorage instanceof Storage) { // 支持本地存储
            return window.localStorage.getItem(name);
        }
        return false;
    },
    /**
     * 删除localStorage
     *
     * @param: {String}name 名
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    removeLocalStorage: function(name) {
        if (window.Storage && window.localStorage && window.localStorage instanceof Storage) { // 支持本地存储
            window.localStorage.removeItem(name);
            return true;
        }
        return false;
    },
    /**
     * 生成uuid
     *
     * @param: {Number}len 长度
     * @param: {Number}radix 精度
     * @return: {String}uuid
     * @auther: 陈宇驰
     * @date: 2019-10-22 15:55:53
     */
    uuid: function(len, radix) { // 获取随机数
        len = len || 16;
        radix = radix || 16;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    /**
     * 格式化方法集合
     *
     * @auther: 陈宇驰
     * @date: 21/6/19 下午3:02
     */
    formatter: {
        mongoTime: function(row, col, value) {
            console.log(value);
            var d = new Date(value);
            var date = {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate(),
                hour: d.getHours(),
                minute: d.getMinutes(),
                second: d.getSeconds()
            }
            for(var x in date){
                date[x] = date[x] * 1 < 10 ? '0' + date[x] : date[x];
            }
            return date.year + '-' + date.month + '-' + date.day + ' ' + date.hour + ':' + date.minute;
        },
        /**
         * 去除时间的时分秒，只剩日期
         * @param: {String}value 日期值
         */
        onlyDate: function(row, col, value) {
            return this.dateFormat('YYYY-mm-dd',new Date(value));
        },
        /**
         * 根据日期格式，格式化日期
         * 
         * @param: {String}fmt 日期格式
         * @param: {Date}date 日期值
         * @auther: 冼泳强
         * @date: 28/4/20 下午3:05
         * 
         */
        dateFormat: function(row, col, value, fmt){
            let ret;
            let opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        /**
         * 去除时间的秒
         *
         * @param: {String}value 日期值
         * @auther: 陈宇驰
         * @date: 21/6/19 下午3:02
         */
        noSecond: function(row, col, value) {
            return /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/g.exec(value);
        },
        /**
         * 转千分位
         *
         * @param: {String}value 值
         * @param: {String}decimal 小数位数 
         * @param: {String}unit 单位
         * @auther: 陈宇驰
         * @date: 21/6/19 下午3:02
         */
        thousandBit: function(row, col, value, decimal = 0, unit) {
            if (Number(value) === 0) decimal = 0;
            value = Number(value).toFixed(decimal);
            var myValue = 0;
            if (value) {
                var reg = /\d{1,3}(?=(\d{3})+$)/g;
                myValue = String(value).replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
                    return s1.replace(reg, "$&,") + s2;
                });
            }
            if (unit)
                myValue = unit + myValue;
            return myValue;
        },
        /**
         * 是与否
         *
         * @param: {String}value 值
         * @auther: 陈宇驰
         * @date: 21/6/19 下午3:02
         */
        booleanFormatter: function(row, col, value) {
            if (value) {
                return '是';
            } else {
                return '否';
            }
        }
    },
    /**
     * 提示框
     *
     * @param: {Object}vue vue对象
     * @param: {String}text 提示文字
     * @auther: 陈宇驰
     * @date: 2019-09-05 18:43:54
     */
    log: {
        success: function(vue, text) {
            vue.$message({
                message: text,
                type: 'success',
                center: true
            });
        },
        warn: function(vue, text) {
            vue.$message({
                message: text,
                type: 'warning',
                center: true
            });
        },
        error: function(vue, text) {
            vue.$message({
                message: text,
                type: 'error',
                center: true
            });
        },
        info: function(vue, text) {
            vue.$message({
                message: text,
                type: 'info',
                center: true
            });
        }
    },
    /**
     * 深拷贝数组
     *
     * @param: {Object}array 原数组
     * @auther: 陈宇驰
     * @date: 2019-09-05 18:43:54
     */
    arrayCopy: function(array) {
        let myArray = [];
        for (let i = 0; i < array.length; i++) {
            if (Object.prototype.toString.call(array[i]) === '[object Object]') {
                myArray[i] = this.objectCopy(array[i]);
            } else if (Array.isArray(array[i])) {
                myArray[i] = this.arrayCopy(array[i]);
            } else {
                myArray[x] = array[i];
            }
        }
        return myArray;
    },
    /**
     * 深拷贝对象
     *
     * @param: {Object}array 原对象
     * @auther: 陈宇驰
     * @date: 2019-09-05 18:43:54
     */
    objectCopy: function(object) {
        let myObject = {};
        for (let x in object) {
            if (Object.prototype.toString.call(object[x]) === '[object Object]') {
                myObject[x] = this.objectCopy(object[x]);
            } else if (Array.isArray(object[x])) {
                myObject[x] = this.arrayCopy(object[x]);
            } else {
                myObject[x] = object[x];
            }
        }
        return myObject;
    },
    /**
     * 对象深合并
     *
     * @param: {Object}o1 对象1
     * @param: {Object}o2 对象2
     * @auther: 陈宇驰
     * @date: 2019-09-05 18:43:54
     */
    objectMerge: function(o1, o2) {
        for (var key in o2) {
            if (o1[key] && o1[key].toString() === "[object Object]") {
                o1[key] = this.objectMerge(o1[key], o2[key]);
            } else {
                o1[key] = o2[key]
            }
        }
        return o1;
    }
}
Vue.prototype.$util = Util;