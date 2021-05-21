$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'],
        repwd: function (value) {
            if (value !== $('.layui-form-item [name=nowpwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })
    $('#formPwd').on('submit', function (e) {
        e.preventDefault()
        var data = {
            oldPwd: $('#prepwd').val(),
            newPwd: $('#nowpwd').val()
        }
        $.ajax({
            type: "POST",
            url: '/my/updatepwd',
            data: data,
            success: function (res) {
                layer.msg('密码修改成功成功')
                window.parent.location.href = '/login.html'
            }
        })
    })

})