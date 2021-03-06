$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        var data = JSON.parse(localStorage.getItem('userInfo'))
        return data && form.val('formUserInfo', data)
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/userinfo',
        //     success: function (res) {
        //         if (res.status !== 0) {
        //             return layer.msg('获取用户信息失败！')
        //         }
        //         form.val('formUserInfo', res.data)
        //     }
        // })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        $('.layui-input-block [name="nickname"]').val('')
        $('.layui-input-block [name="email"]').val('')
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})