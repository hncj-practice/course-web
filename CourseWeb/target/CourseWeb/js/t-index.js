// 入口函数
// $(function () {
//     // 头像移入移出
//     {
//         // alert('登陆成功');
//         let avatar = $('#headAvatar');
//         let manage = $('.manage');
//
//         avatar.mouseenter(function () {
//             console.log('移入');
//
//             manage.slideDown(200);
//         });
//
//         manage.mouseleave(function () {
//             manage.slideUp(200);
//         });
//     }
// });

// 请求当前教师教授的所有课程信息并加载到页面
{
    // 请求url http://123.56.156.212/Interface/teacher/teach?tno=888888888
    let url = 'http://123.56.156.212/Interface/teacher/teach';
    let param = 'tno=' + $('#tno').text();

    url = "http://123.56.156.212/Interface/teacher/teach?tno=888888888";
    // console.log(url);

    // 进行请求，请求未完成时，显示加载中
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            loadCourses(xhr.responseText);
        }
    };
    xhr.send(param);

    // 请求成功，加载课程


}

function loadCourses(jsonText) {
    let obj = JSON.parse(jsonText);
    let data = obj.data;
    console.log(data);

    let length = data.length;
    let html = "";

    for (let i = 0; i < length; i++) {
        html += `
        <div class="course">
            <img src="{0}" alt="">
            <div class="title">
                <h4 class="name">{1}</h4>
                <h4 class="numbers">{2}人</h4>
            </div>
        </div>        
        `.format(data[i].coverimg, data[i].cname, data[i].snum);
    }
    $('.loading').hide(250);
    $('.courses').html(html);
    $('.courses').show(250);
}



