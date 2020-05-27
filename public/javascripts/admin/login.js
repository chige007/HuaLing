$(function(){
    $('#loginBtn').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/user/login',
            data: {
                username: $.trim($('[name="username"]').val()),
                password: $.trim($('[name="password"]').val())
            },
            success: function(res) {
                if (res.code == 200) {
                    window.location.href = "/admin/index/home"
                } else {
                    alert(res.msg);
                }
            }
        })
    })
})