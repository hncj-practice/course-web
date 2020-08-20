function $(param) {
    // noinspection JSUnresolvedFunction
    return jQuery(param);
}

// 入口函数
$(function () {
    // 请求课程信息
    requestCourses();

    // 加载事件
    loadEvent();
});

// 请求课程信息
function requestCourses() {
    let url = "http://123.56.156.212/Interface/teacher/teach?tno=" + $('#tno').text();
    // 进行请求，请求未完成时，显示加载中
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 请求成功，加载课程
            loadCourses(xhr.responseText);
        }
    };
    xhr.send();
}

/**
 * 根据json字符串生成
 * @param jsonText
 */
function loadCourses(jsonText) {
    let obj = JSON.parse(jsonText);
    let loading = $('.loading');
    let courses = $('.courses');
    if (!obj.data) {
        // 没有课程信息
        loading.hide(250);
        return;
    }
    let data = obj.data;
    console.log(data);
    let length = data.length;


    let html = "";

    for (let i = 0; i < length; i++) {
        // noinspection all
        html += `
        <div class="course" id="course{3}">
            <img src="{0}" alt="" >
            <div class="title">
                <h4 class="name">{1}</h4>
                <h4 class="numbers">{2}人</h4>
            </div>
        </div>        
        `.format(data[i]['coverimg'], data[i]['cname'], data[i]['snum'],data[i]['cid']);
    }
    courses.html(html);
    loading.hide(250);
    courses.show(250);
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
}








