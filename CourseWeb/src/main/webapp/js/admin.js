// 入口函数
$(function () {
    loadEvents();
});

/**
 * 加载事件
 */
function loadEvents() {
    // 左侧菜单切换
    {
        let change2User = $('#change2User');
        let change2Course = $('#change2Course');


        change2User.click(() => {
            change2User.addClass('active');
            change2Course.removeClass('active');
            $('#mainFrame').attr('src', 'admin-user-manage.html');
        });

        change2Course.click(() => {
            change2Course.addClass('active');
            change2User.removeClass('active');
            $('#mainFrame').attr('src', 'admin-course-manage.html');
        });

    }
}