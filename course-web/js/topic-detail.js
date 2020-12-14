/**
 * 教师 - 课程 - 话题详情页面
 */


let topicid = getQuery('topicid');

// 入口函数
$(function () {
    // 检查登录
    checkLogin();

    // 加载话题
    loadTopic();

    // 加载话题的评论
    loadComments();

});


// 检查登录
function checkLogin() {


    // 更改头像和章节名
    $('#headAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);
    $('#tno').text(localStorage['course-web-curr-teacher-username']);
}


function loadTopic() {

}

function loadComments() {

}