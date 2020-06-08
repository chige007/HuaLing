$(function() {
    var page = 1;
    var pageSize = 5;
    var scrollLock = true;
    var loading = {
        show: function(tips) {
            $('<div class="loading">'+ tips +'</div>').appendTo($('#newList'));
        },
        hide: function() {
            $('#newList .loading').remove();
        }
    }
    function getNewsList(year) {
        scrollLock = false;
        if (page == 1) {
            $('#newList').empty();
        }
        loading.hide();
        loading.show('加载中...');
        var filter = {}
        if (year) {
            filter.happenTime = {
                $gte: new Date(year * 1, 0, 1),
                $lt: new Date(year * 1 + 1, 0, 1)
            }
        }
        $.ajax({
            url: '/news/list',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                options: {
                    skip: (page - 1) * pageSize,
                    limit: pageSize,
                    sort: {
                        'happenTime': -1
                    }
                },
                filter: filter
            }),
            success: function(res) {
                loading.hide();
                var lang = $('#LANG').val();
                if (res.code == 200) {
                    var list = res.data.rows;
                    if (!list.length) {
                        loading.show('没有更多新闻消息');
                        return;
                    }
                    scrollLock = true;
                    for (var i = 0 ; i < list.length ; i++) {
                        var item = $('<div class="item"></div>');
                        var myDate = new Date(list[i]['happenTime']);
                        var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        var date = $('<p class="date">'+ myDate.getDate() + ' ' + monthArr[myDate.getMonth()] + ' ' + myDate.getFullYear() +'</p>').appendTo(item);
                        var title = $('<p class="title">'+ list[i][lang]['title'] +'</p>').appendTo(item);
                        var content = $('<p class="content">'+ list[i][lang]['content'] +'</p>').appendTo(item);
                        $('#newList').append(item);
                    }
                }
            }
        })
    }

    $('#yearSelector').on('change', function() {
        page = 1;
        getNewsList(this.value);
    });

    $('body').scroll(function(e) {
        if ($(this).scrollTop() >= $('#newList').outerHeight() - 400 && scrollLock) {
            page++;
            getNewsList();
        }
    });

    getNewsList('');
});