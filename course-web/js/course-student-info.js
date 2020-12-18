/**
 * 课程 - 学生情况页面
 */

let cid = '';
let sign = '';

// 入口函数
$(function () {
    cid = getQuery('cid');
    sign = getQuery('sign');

    checkLogin();

    (async () => {

    })();
});


// 检查登录
function checkLogin() {
    if (sign !== md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])) {
        window.location.href = 'user-login.html';
    }

    // // 更改头像和id
    $('#tid').text(localStorage['course-web-curr-teacher-username']);
    $('#headAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);

}