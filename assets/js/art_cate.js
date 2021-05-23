$(function () {
    var layer = layui.layer
    // var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                var bodyHtml = template('tpl-table', res.data)
                $('tbody').html(bodyHtml)
            }
        })
    }
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('新增分类失败')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        var name = $(this).attr('data-name')
        var alias = $(this).attr('data-alias')
        $('#names').val(name)
        $('#alias').val(alias)
        $('.hidden').val(id)
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/cates/' + id,
        //     success: function (res) {
        //         form.val('form-edit', res.data)
        //     }
        // })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.confirm('确定删除?', {
                    icon: 3,
                    title: '提示'
                }, function (index) {
                    layer.msg(res.message)
                    initArtCateList()
                    layer.close(index);
                })
            }
        })
    })
})