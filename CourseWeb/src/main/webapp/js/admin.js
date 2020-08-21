// 定义一些常量
// 每页展示的教师数
const TEACHER_PER_PAGE = 15;
const STUDENT_PER_PAGE = 15;

// 入口函数
$(function () {


    loadEvents();
});




// 事件
function loadEvents() {


    // 点击左侧切换
    {
        // 左侧按钮
        let change2User = $('#change2User');
        let change2Course = $('#change2Course');
        // 面板
        let userPanel = $('#userPanel');
        let coursePanel = $('#coursePanel');
        change2User.click(() => {

            setClass(change2Course, 'inactive', 'active');
            setClass(change2User, 'active', 'inactive');
            userPanel.css('display', 'block');
            coursePanel.css('display', 'none');
        });

        change2Course.click(() => {
            setClass(change2User, 'inactive', 'active');
            setClass(change2Course, 'active', 'inactive');
            userPanel.css('display', 'none');
            coursePanel.css('display', 'block');
        });
    }


    // 用户管理界面 切换教师/学生
    {
        let cg2Teacher = $('#cg2Teacher');
        let cg2Student = $('#cg2Student');
        let teacher = $('.teacher');
        let student = $('.student');

        cg2Teacher.click(() => {
            student.hide(200);
            teacher.show(200);
        });
        cg2Student.click(() => {
            teacher.hide(200);
            student.show(200);
        });
    }


    // 教师用户操作
    {
        // 重置
        $('.reset-teacher').click((e) => {
            let tno = $(e.target).attr('tno');
            console.log('重置 ' + tno);
        });

        // 删除
        $('.delete-teacher').click((e) => {
            let tno = $(e.target).attr('tno');
            console.log('删除 ' + tno);
        });
    }
}

