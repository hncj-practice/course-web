/**
 * 管理员页面
 */

// 入口函数
$(function () {
    // 验证sign
    checkLogin();

    // 加载事件
    loadEvents();
});


function checkLogin() {
    // 获取是否传入了sign
    // 传了sign
    let sign = getQueryString('sign');
    let username = localStorage['course-web-curr-admin-username'];
    let password = localStorage['course-web-curr-admin-password'];
    let flag;
    if (sign) {
        // 检验sign
        flag = (sign === md5(username + password));
    }
    // 没传sign
    else {
        flag = false;
    }
    if (!flag) {
        window.location.href = 'user-login.html';
    }
}


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

