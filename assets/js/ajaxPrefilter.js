$(function () {
    $.ajaxPrefilter(function (options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        if (options.url.indexOf('/my') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        options.complete = function (res) {
            if (res.responseJSON.status === 1) {
                location.href = '/login.html'
                localStorage.removeItem('token')
            }
        }
    })
})