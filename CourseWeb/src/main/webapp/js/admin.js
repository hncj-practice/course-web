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
    switchTab('.frame-admin', [
        new Tab('#change2User', 'admin-user-manage.html'),
        new Tab('#change2Course', 'admin-course-manage.html')
    ]);
}