// 入口函数
$(function () {
    let sign = getQueryString('sign');
    let teacherId = localStorage['course-web-curr-teacher-username'];
    let teacherPwd = localStorage['course-web-curr-teacher-password'];

    // 检验sign
    if (sign === md5(teacherId + teacherPwd)){
        console.log(true)
    }

    // let flag = false;

    // (async function () {
    //     // 验证登录
    //     await checkLogin(teacherId, teacherPwd);
    //
    //
    //     // 请求课程信息
    //     if (flag) {
    //         await requestCourses();
    //     }
    // })();


});


// 验证登录
async function checkLogin(teacherId, teacherPwd) {
    console.log(teacherId);
    console.log(teacherPwd);
    let [err, data] = await awaitWrap(post(API.ACCOUNT_API.LOGIN, {
        username: teacherId,
        password: teacherPwd,
        type: 2
    }));
    console.log([err, data]);
}


// 请求课程信息
async function requestCourses() {
    // 进行请求，请求未完成时，显示加载中
    let url = COURSE_API.FIND_BY;
    let param = {
        condition: $('#tno').text(),
        type: 1
    };

    let [err, data] = await awaitWrap(post(url, param));
    if (err) {
        if (isString(err)) {
            toastr.warning(err);
        } else {
            toastr.error(ErrorCode["10001"]);
        }
        loadError();
    } else {
        console.log(data);
        loadCourses(data);
    }

}


/**
 * 根据obj生成课程信息
 * @param obj obj
 */
function loadCourses(obj) {
    let loading = $('.loading');
    let courses = $('.courses');
    if (!obj.data) {
        // 没有课程信息
        loading.hide(250);
        return;
    }
    allCourses = obj.data;
    let length = allCourses.length;
    let html = "";

    for (let i = 0; i < length; i++) {
        // noinspection all
        html += `
        <div class="course">
            <img class="course-img" cid="${allCourses[i]['cid']}" src="${allCourses[i]['coverimg']}" alt="" >
            <div class="title">
                <h4 class="name">${allCourses[i]['cname']}</h4>
                <h4 class="numbers">${allCourses[i]['snum']}人</h4>
            </div>
        </div>        
        `;
    }

    courses.html(html);
    loading.hide(250);
    courses.show(250);

    // 加载事件
    loadEvent();
}


// 显示错误
function loadError() {
    // alert('请求课程失败！');
    $('.loading').css('display', 'none');
    $('.failed').css('display', 'block');
}


/**
 * 加载各种事件
 */
function loadEvent() {
    // 课程被点击
    {
        $('.course-img').click((e) => {
            // 去正在点击的课程id
            let cid = $(e.target).attr('cid');
            console.log('跳转到课程：' + cid);
            // 跳转
            // window.open('../course/home?courseId=' + cid, '_blank');
            alert('跳转到：' + cid);
        });
    }
}








