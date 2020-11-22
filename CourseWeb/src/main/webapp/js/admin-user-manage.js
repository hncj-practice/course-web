// 入口函数
$(function () {
    // 刷新课程列表
    console.log('切换到用户管理');

    loadEvents();
});


// 加载事件
function loadEvents() {
    // 点击切换面板
    switchTab('.frame-admin-user', [
        new Tab('#cg2Teacher', 'admin-user-teacher.html'),
        new Tab('#cg2Student', 'admin-user-student.html')
    ]);
}