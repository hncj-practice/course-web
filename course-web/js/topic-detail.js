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
    (async () => {
        await loadComments();
    })();

});


// 检查登录
function checkLogin() {
    let sign = getQuery('sign');
    if (sign !== md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])) {
        window.location.href = 'user-login.html';
    }

    // 更改头像和章节名
    $('#headAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);
    $('#tno').text(localStorage['course-web-curr-teacher-username']);
}


// 加载话题
function loadTopic() {
    let topicid = getQuery('topicid');

}


// 加载评论
async function loadComments() {
    let topicid = getQuery('topicid');

    let url = API.COMMENT.FIND;
    let param = {
        topicid: topicid
    };

    let [err, data] = await awaitWrap(post(url, param));
    if (err) {
        toastr.error(err);
    } else {
        let comments = data.data;
        let html = '';
        comments.forEach(comment => {
            html += `
            <li class="comment-item">
                <div class="left">
                    <img src="${comment['savatar']}" alt="">
                </div>
                <div class="right">
                    <h4 class="comment-student">${comment['sname']}</h4>
                    <h4 class="comment-time">${formatTime(comment['commenttime'])}</h4>
                    <p class="comment-content">${comment['commentcontent']}</p>
                </div>
            </li>
           `;
        });
        $('#commentList').html(html);
        toastr.success('评论加载成功！');
    }
}