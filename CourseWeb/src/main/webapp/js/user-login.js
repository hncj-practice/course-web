/**
 * 用户登录页面
 */

// 入口函数
$(function () {
    loadEvents();
});


/**
 * 加载事件
 */
function loadEvents() {
    // 菜单切换
    switchDivTab([
        new DivTab('#userLogin', '.user'),
        new DivTab('#adminLogin', '.admin')
    ]);
}