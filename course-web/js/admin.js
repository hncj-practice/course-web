/**
 * 管理员页面
 */

// 入口函数
$(function () {
    loadEvents();
});


/**
 * 加载事件
 */
function loadEvents() {
    // 左侧菜单切换
    switchIFrameTab('.frame-admin', [
        new IframeTab('#change2User', 'admin-user-manage.html'),
        new IframeTab('#change2Course', 'admin-course-manage.html')
    ]);
}

