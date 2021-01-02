/**
 * 这里所有代码都写在代码块里面了
 * 后期可以在代码块变成函数
 * 如果忘记了，可以请后面的同学改
 * 每个代码块的功能都有注释
 */


// 入口函数
$(function () {
    checkLogin();

    // 切换页面
    switchIFrameTab('#frameCourse', [
        new IframeTab('#chapterManage', 'course-question.html'),
        new IframeTab('#paperManage', 'course-paper.html'),
        new IframeTab('#topicManage', 'course-topic.html')
    ]);

    // 跳转到学生情况
    $('#studentsInfo').click(() => {
        let url = `
        course-student-info.html?
        cid=${getQuery('cid')}
        &sign=${md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])}
        `.replace(/\s/g, '');
        window.open(url, '_blank');
    });

});


// 检查登录
function checkLogin() {
    let sign = getQueryString('sign');
    if (sign !== md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])) {
        window.location.href = 'user-login.html';
    }
    // 改课程名
    $('#courseName').text(getQuery('cname'));
    // 改title
    $('title').text('课程 - ' + getQuery('cname'));
    // 更改头像和id
    $('#tid').text(localStorage['course-web-curr-teacher-username']);
    $('#headAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);
}
