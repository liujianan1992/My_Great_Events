$(function () {
    $('#link_reg').on('click', function () {
        $('.log_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click', function () {
        $('.log_box').show()
        $('.reg_box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'],
        repwd: function (value) {
            if (value !== $('.reg_box [name=password]').val()) {
                return '两次密码输入不一致'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登陆！')
            $('#link_login').click()
        })
    })
    $('#form_log').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.open({
                    content: '账户名或密码输入错误，请重新输入！',
                    end: function () {
                        $('.layui-input').val('')
                    }
                })
            }
            layer.open({
                content: '登陆成功！',
                end: function () {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            })
        })
    })
})