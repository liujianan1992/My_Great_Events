$(function () {
    var layer = layui.layer
    var $image = $('#image')
    var preImgSrc = window.parent.$('.layui-nav-img').attr('src')
    var file = null
    $image.attr('src', preImgSrc)
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        file = e.target.files[0]
        var fileUrl = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', fileUrl).cropper(options)
    })
    $('#btnUpload').on('click', function () {
        if (!file) {
            return layer.msg('请上传文件')
        } else {
            var dataURL = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            }).toDataURL('image/png');
            $.ajax({
                method: 'POST',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success: function (res) {
                    if (res.status !== 0) return layer.msg('更新头像失败')
                    layer.msg('更新头像成功')
                    window.parent.getUserInfo()
                }
            })
        }
    })
})