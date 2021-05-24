$(function () {
    //设置一个查询的参数对象，根据接口文档需要设置四项数据
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer
    var form = layui.form
    initTab()
    initCate()

    function initTab() {
        $.ajax({
            method: "GET",
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var tbodyHtml = template('tpl-list', res)
                $('tbody').html(tbodyHtml)
                renderPage(res.total)
            }
        })
    }
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        m = m > 10 ? m : '0' + m
        var d = dt.getDate()
        d = d > 10 ? d : '0' + d
        var hh = dt.getHours()
        hh = hh > 10 ? hh : '0' + hh
        var mm = dt.getMinutes()
        mm = mm > 10 ? mm : '0' + mm
        var ss = dt.getSeconds()
        ss = ss > 10 ? ss : '0' + ss
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var cateList = template('tpl-cate', res)
                $('[name=cate_id]').html(cateList)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var status = $('[name=status]').val()
        q.cate_id = cate_id
        q.state = status
        initTab()
    })

    function renderPage(total) {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTab()
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确定删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    layer.close(index)
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    //数据删除后判断当前页面是否还有别的数据，如果没有数据需要调整页码值，再调用方法渲染页面
                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? q.pagenum : q.pagenum - 1
                    }
                    initTab()
                }
            })
        })
    })
})