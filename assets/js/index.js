$(function () {
    getUserInfo()
    $('#btnLogout').on('click', function () {
        layui.layer.confirm('确认退出登陆?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            location.href = "/login.html"
            localStorage.removeItem('token')
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                loadAvatar(res.data)
            }
        }
    })
}

function loadAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎  ' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}