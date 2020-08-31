// 入口函数
$(function () {
    switchTab();

});

// 点击左侧切换
function switchTab() {
    // 左侧按钮
    let change2User = $('#change2User');
    let change2Course = $('#change2Course');
    // 面板
    let userPanel = $('#userPanel');
    let coursePanel = $('#coursePanel');
    change2User.off('click');
    change2User.click(() => {
        setClass(change2Course, 'inactive', 'active');
        setClass(change2User, 'active', 'inactive');
        userPanel.css('display', 'block');
        coursePanel.css('display', 'none');
        loadUserPage();
    });

    change2Course.off('click');
    change2Course.click(() => {
        setClass(change2User, 'inactive', 'active');
        setClass(change2Course, 'active', 'inactive');
        userPanel.css('display', 'none');
        coursePanel.css('display', 'block');
        loadCoursePage();
    });
}