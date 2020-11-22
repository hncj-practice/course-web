// 入口函数
$(function () {
    // 刷新课程列表
    console.log('切换到用户管理');

    loadEvents();
});


// 加载事件
function loadEvents() {
    // 点击切换面板
    {
        let cg2Teacher = $('#cg2Teacher');
        let cg2Student = $('#cg2Student');

        cg2Teacher.click(() => {
            cg2Teacher.addClass('active');
            cg2Student.removeClass('active');
            $('.frame-admin-user').attr('src', 'admin-user-teacher.html');
        });

        cg2Student.click(() => {
            cg2Student.addClass('active');
            cg2Teacher.removeClass('active');
            $('.frame-admin-user').attr('src', 'admin-user-student.html');
        });

    }
}