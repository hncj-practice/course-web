// 入口函数
$(function () {
    // 请求课程信息
    requestCourses();
});


// 请求课程信息
function requestCourses() {
    // 进行请求，请求未完成时，显示加载中
    let url = 'http://123.56.156.212/Interface/course/getcoursebytno';
    let param = {
        tno: $('#tno').text()
    };

    // // 延迟1秒再请求
    // setTimeout(() => {
    //     ajax_post(url, param, loadCourses, loadError, 5000);
    // }, 1000);

    $.ajax({
        type: "POST",
        url: url,
        data: param,
        traditional: true,
        success: loadCourses,
        error: loadError
    });

}

/**
 * 根据xhr生成课程信息
 // * @param {XMLHttpRequest} xhr
 */
function loadCourses(responseText) {
    let obj = JSON.parse(responseText);
    let loading = $('.loading');
    let courses = $('.courses');
    if (!obj.data) {
        // 没有课程信息
        loading.hide(250);
        return;
    }
    let data = obj.data;
    let length = data.length;
    let html = "";

    for (let i = 0; i < length; i++) {
        // noinspection all
        html += `
        <div class="course">
            <img class="course-img" cid="{3}" src="{0}" alt="" >
            <div class="title">
                <h4 class="name">{1}</h4>
                <h4 class="numbers">{2}人</h4>
            </div>
        </div>        
        `.format(data[i]['coverimg'], data[i]['cname'], data[i]['snum'], data[i]['cid']);
    }
    courses.html(html);
    loading.hide(250);
    courses.show(250);

    // 加载事件
    loadEvent();
}

function loadError() {
    // alert('请求课程失败！');
    setTimeout(() => {
        $('.loading').css('display', 'none');
        $('.failed').css('display', 'block');
    }, 1800);
}

/**
 * 加载各种事件
 */
function loadEvent() {
    // 头像移入移出
    {
        let avatar = $('#headAvatar');
        let manage = $('.manage');

        avatar.mouseenter(function () {
            console.log('移入');
            manage.slideDown(200);
        });

        manage.mouseleave(function () {
            manage.slideUp(200);
        });
    }

    // 课程被点击
    {
        $('.course-img').click((e) => {
            // 去正在点击的课程id
            let cid = $(e.target).attr('cid');
            console.log(cid);
            // 跳转
        });
    }
}








