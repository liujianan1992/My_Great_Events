$(function () {
    var layer = layui.layer
    var form = layui.form
    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var selectHtml = template('tpl-cate', res)
                $('[name="cate_id"]').html(selectHtml)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnImage').on('click', function () {
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function (e) {
        var files = e.target.files[0]
        var newImgURL = URL.createObjectURL(files)
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })
    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', art_state)
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            fd.append('cover_img', blob)
            // console.log(fd);
            // fd.forEach(function (val, key) {
            //     console.log(val, key);
            publishAtr(fd)
        })

    })

    function publishAtr(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd, //提交数据为fd格式，ajax默认是key=value格式
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) return layer.msg('文章发布失败')
                layer.msg(res.message)
                // location.href = '/article/art_list.html'
            }
        })
    }
})