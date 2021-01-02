let teacherId = '';
let teacherPwd = '';
let allCourses = [];

// 入口函数
$(function () {
    let sign = getQueryString('sign');
    teacherId = localStorage['course-web-curr-teacher-username'];
    teacherPwd = localStorage['course-web-curr-teacher-password'];
    (async function () {
        // 检验sign
        if (sign === md5(teacherId + teacherPwd)) {
            // 检验成功，登录成功
            console.log(true);
            // 加载教师的课程
            await loadData();
        } else {
            // 检验本地存储的是否正确
            if (!(teacherId && teacherPwd)) {
                window.location.href = 'user-login.html';
            }
            // 检证
            await checkAndLogin(teacherId, teacherPwd);
        }
    })();
});


// 验证并登录
async function checkAndLogin(teacherId, teacherPwd) {
    let [err, data] = await awaitWrap(post(API.ACCOUNT_API.LOGIN, {
        username: teacherId,
        password: teacherPwd,
        type: 2
    }));
    if (err) {
        window.location.href = 'user-login.html';
    } else {
        console.log(data);
        await loadData();
    }
}


// 加载页面数据
async function loadData() {
    //加载姓名头像
    {
        // 教师号
        $('#tno').text(teacherId);
        // 头像
        $('#headAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);
        $('#LargeAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);
        // 姓名
        $('#welcome').text(`${localStorage['course-web-curr-teacher-name']}，${welcome()}`);
    }

    // 加载课程
    {
        // 进行请求，请求未完成时，显示加载中
        let url = API.COURSE_API.FIND_BY;
        let param = {
            condition: teacherId,
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
            renderCourses(data);
        }
    }
}


/**
 * 根据obj生成课程信息
 * @param obj obj
 */
function renderCourses(obj) {
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
            <img class="course-img" cname="${allCourses[i]['cname']}" cid="${allCourses[i]['cid']}" src="${allCourses[i]['coverimg']}" alt="" >
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
            let cname = $(e.target).attr('cname');
            console.log('跳转到课程：' + cid);
            // 跳转到课程并携带sign
            let url = `teacher-course.html?cid=${cid}&cname=${cname}&sign=${md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])}`;
            window.open(url, '_blank');
        });
    }
}








