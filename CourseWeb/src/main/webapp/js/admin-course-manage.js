/**
 * 管理员 - 课程管理页面
 *
 * 页面所做的三件事：
 * （1）获取数据
 * （2）渲染数据
 * （3）添加事件
 */

// 入口函数
$(function () {
    console.log('切换到课程管理');
    // 刷新课程列表
    (async function () {
        await refresh();
    })();
});


// 获取数据
async function refresh() {
    let url = COURSE_API.FIND;
    let param = {
        page: 1,
        num: 14
    };
    // 请求数据
    const [err, data] = await awaitWrap(post(url, param));
    // 处理数据
    await process([err, data], async () => {
        // 渲染数据
        await renderCourseTable(data);
        // 元素生成后添加事件
        await loadEvents();
        // 提示刷新成功
        toastr.success('课程刷新成功');
    });
}

// 渲染课程列表
function renderCourseTable(data) {
    // 没有查到数据
    if (data.code === 401) {
        toastr.warning('没有数据');
        return;
    }

    // 处理数据
    let courseTable = $('#courseTable');
    let html = '';
    let cid, cname, tname, status;
    data.data.forEach((item) => {
        cid = item['cid'];
        cname = item['cname'];
        tname = item['tname'];
        status = item['status'];

        // noinspection HtmlUnknownAttribute
        html += `
        <tr>
            <td>${cid}</td>
            <td><input id="courseName${cid}" class="course-name" type="text" value="${cname}"></td>
            <td>${tname}</td>
            <td>${status}</td>
            <td class="options">
                <span cid="${cid}" class="save-course">保存更改</span>
                <span cid="${cid}" class="delete-course">删除</span>
            </td>
        </tr>`;
    });

    // 渲染到页面上
    courseTable.html(html);
}


/**
 * 加载事件
 */
async function loadEvents() {

    // 删除课程
    {
        $('.delete-course').off('click');
        $('.delete-course').click((e) => {
            let cid = $(e.target).attr('cid');
            let body = '确定删除课程？<br>课程ID：' + cid;
            // 弹窗删除
            showWarning(body, () => {
                deleteCourse(cid, refresh);
            });
        });
    }


    // 修改课程名称
    {
        $('.save-course').off('click');
        $('.save-course').click((e) => {
            let cid = $(e.target).attr('cid');
            let newName = $('#courseName' + cid).val();
            let body = '确定改名？<br>新名称：' + newName;
            // 弹窗重命名
            showWarning(body, () => {
                renameCourse(cid, newName);
            });
        });
    }


    // 新建课程
    {
        // 打开按钮
        $('#newCourse').off('click');
        $('#newCourse').click(async () => {
            $('.add-new-course').show(250);
            console.log('打开');
            $('#courseClassesAdd').text('');
            // 加载信息，放到下拉框里面
            // 并行获取
            let [teacherData, classData] = await Promise.all([
                getEntities(Entity.TEACHER),
                getEntities(Entity.CLASS)
            ]);
            // 添加到下拉列表
            let teacherHtml = '', classHtml = '';
            let teacherList = $('#teacherList');
            let classesList = $('#classesList');
            teacherData.forEach(item => {
                teacherHtml += `<option value="${item.tno}">${item.tno + ':' + item.name}</option>`;
            });
            classData.forEach(item => {
                classHtml += `<option value="${item.classid}">${item.classid}</option>`;
            });
            // 渲染到页面
            teacherList.html(teacherHtml);
            classesList.html(classHtml);
        });

        // 关闭按钮
        $('#closeAddCourseDiv').off('click');
        $('#closeAddCourseDiv').click(() => {
            console.log('关闭');
            $('.add-new-course').hide(250);
        });

        // 添加班级候选列表
        $('#addClassToList').off('click');
        $('#addClassToList').click(() => {
            console.log('添加了');
            // 拿到当前选择的班级
            let classesList = $('#classesList').val();
            console.log(classesList);
            // 添加到候补列表
            $('#courseClassesAdd').text($('#courseClassesAdd').text() + classesList + ';');
        });

        // 确定新建按钮
        $('#addCourseEnsure').off('click');
        $('#addCourseEnsure').click(() => {
            console.log('确定新建课程');

            let classes = $('#courseClassesAdd').text().split(";");
            // 删除最后面的空元素
            classes.splice(classes.length - 1, 1);

            // 调用API新建
            let param = {
                semester: 1,
                tno: $('#teacherList').val(),
                cname: $('#courseNameAdd').val(),
                classid: classes,
                coverimg: 'default',
                status: '1'
            };

            addCourse(param, () => {
                $('.add-new-course').hide(250);
                refresh();
            });
        });
    }
}


/**
 * 删除课程
 * @param cid 课程id
 * @param success 成功的回调
 */
async function deleteCourse(cid, success) {
    let url = COURSE_API.DELETE;
    let param = {
        adminuser: adminUN,
        adminpwd: adminUP,
        courseid: cid
    };
    // 发送post请求
    const [err, data] = await awaitWrap(post(url, param));
    // 通用处理
    await process([err, data], success);
}


/**
 * 重命名课程
 * @param cid 课程id
 * @param newName 新名字
 * @param success 成功回调
 */
async function renameCourse(cid, newName, success) {
    let url = COURSE_API.UPDATE;
    let param = {
        user: adminUN,
        pwd: adminUP,
        courseid: cid,
        name: newName
    };
    // 发送post请求
    const [err, data] = await awaitWrap(post(url, param));
    // 通用处理
    await process([err, data], success);
}


/**
 * 添加课程
 * @param param 调用时的参数
 * @param success 成功回调
 */
async function addCourse(param, success) {
    let url = COURSE_API.ADD;
    // 添加上管理员权限
    param['adminuser'] = adminUN;
    param['adminpwd'] = adminUP;
    // 发送post请求
    const [err, data] = await awaitWrap(post(url, param));
    // 通用处理
    await process([err, data], success);
}

