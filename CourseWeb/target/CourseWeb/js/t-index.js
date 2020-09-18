// 入口函数
$(function () {
    // 请求课程信息
    requestCourses();
});


// 请求课程信息
function requestCourses() {
    // 进行请求，请求未完成时，显示加载中
    let url = COURSE_API.FIND_BY;
    let param = {
        condition: $('#tno').text(),
        type: 1
    };

    // 延迟1秒再请求
    setTimeout(() => {
        my_ajax(url, param, loadCourses, loadError);
    }, 1000);
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
            <img class="course-img" cid="{3}" src="{0}" alt="" >
            <div class="title">
                <h4 class="name">{1}</h4>
                <h4 class="numbers">{2}人</h4>
            </div>
        </div>        
        `.format(allCourses[i]['coverimg'], allCourses[i]['cname'], allCourses[i]['snum'], allCourses[i]['cid']);
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
        // let avatar = $('#headAvatar');
        // let manage = $('.manage');
        //
        // avatar.mouseenter(function () {
        //     console.log('移入');
        //     manage.slideDown(200);
        // });
        //
        // manage.mouseleave(function () {
        //     manage.slideUp(200);
        // });
    }

    // 课程被点击
    {
        $('.course-img').click((e) => {
            // 去正在点击的课程id
            let cid = $(e.target).attr('cid');
            console.log('跳转到课程：' + cid);
            // 跳转
            window.open('../course/home?courseId=' + cid, '_blank');
        });
    }
}








