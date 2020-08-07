// 判断用户名和密码
{
    // alert('123')
    
}

// 入口函数
$(function () {
    // 头像移入移出
    {
        let avatar = $('#headAvatar');
        let manage = $('.manage');

        avatar.mouseenter(function () {
            console.log('移入');

            manage.slideDown(200);
        });

        manage.mouseleave(function () {
            manage.slideUp(200);
        });
    }
});




