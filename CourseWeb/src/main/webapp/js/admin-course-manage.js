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
    // 刷新课程列表
    console.log('切换到课程管理');

    refresh().then(r => {
        // 为了不报警告
        return r;
    });

});


// 获取数据
async function refresh() {
    // 获取数据
    let data = await promiseAjaxPost({
        url: COURSE_API.FIND,
        param: {
            page: 1,
            num: 14
        }
    });

    // 渲染数据
    await renderCourseTable(data);

    // 元素生成后添加事件
    await loadEvents();

    // 提示刷新成功
    toastr.success('课程刷新成功');
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
            <td>{0}</td>
            <td><input id="courseName{0}" class="course-name" type="text" value="{1}"></td>
            <td>{2}</td>
            <td>{3}</td>
            <td class="options">
                <span cid="{0}" class="save-course">保存更改</span>
                <span cid="{0}" class="delete-course">删除</span>
            </td>
        </tr>
        `.format(cid, cname, tname, status);
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
            myBootstrapModel('警告', body, '确定', '取消', () => {
                // 请求API删除
                let url = COURSE_API.DELETE;
                // noinspection DuplicatedCode
                let param = {
                    adminuser: parent.adminUN,
                    adminpwd: parent.adminUP,
                    courseid: cid
                };
                let success = (e) => {
                    // 成功
                    if (e.code === 200) {
                        toastr.success(e.message);
                        refresh();
                    } else {
                        toastr.error(e.message);
                    }
                };
                my_ajax(url, param, success);
            });
        });
    }


    // 修改课程名称
    {
        $('.save-course').off('click');
        $('.save-course').click((e) => {

            console.log(parent.adminUN);
            console.log(parent.adminUP);

            let cid = $(e.target).attr('cid');
            let newName = $('#courseName' + cid).val();
            let body = '确定改名？<br>新名称：' + newName;
            myBootstrapModel('警告', body, '确定', '取消', () => {
                // 请求API修改
                let url = COURSE_API.UPDATE;
                // noinspection DuplicatedCode
                let param = {
                    user: parent.adminUN,
                    pwd: parent.adminUP,
                    courseid: cid,
                    name: newName
                };
                let success = (e) => {
                    // 成功
                    if (e.code === 200) {
                        toastr.success(e.message);
                    } else {
                        toastr.error(e.message);
                    }
                };
                my_ajax(url, param, success);
            });
        });
    }


    // 新建课程
    {
        // 打开按钮
        $('#newCourse').off('click');
        $('#newCourse').click(() => {
            $('.add-new-course').show(250);
            console.log('打开');
            $('#courseClassesAdd').text('');
            // 加载信息
            // 加载所有教师信息，放在下拉框里面
            {
                let url = TEACHER_API.FIND;
                let param = {};
                let success = (e) => {
                    // 成功
                    if (e.code === 200) {
                        // 添加到下拉列表
                        let html = '';
                        let teacherList = $('#teacherList');
                        e['data'].forEach((item) => {
                            html += `<option value="{0}">{1}</option>`.format(item.tno, item.tno + ':' + item.name);
                        });
                        teacherList.html(html);
                    } else {
                        toastr.error(e.message);
                    }
                };
                my_ajax(url, param, success);
            }
            // 加载所有班级信息，放在下拉框里面
            {
                let url = CLASS_API.FIND;
                let param = {};
                let success = (e) => {
                    // 成功
                    if (e.code === 200) {
                        // 添加到下拉列表
                        let html = '';
                        let classesList = $('#classesList');
                        e['data'].forEach((item) => {
                            html += `<option value="{0}">{0}</option>`.format(item.classid);
                        });
                        classesList.html(html);
                    } else {
                        toastr.error(e.message);
                    }
                };
                my_ajax(url, param, success);
            }
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

            let name = $('#courseNameAdd').val();
            let tno = $('#teacherList').val();
            let classes = $('#courseClassesAdd').text().split(";");
            // 删除最后面的空元素
            classes.splice(classes.length - 1, 1);

            // 调用API新建
            let url = COURSE_API.ADD;
            let param = {
                adminuser: parent.adminUN,
                adminpwd: parent.adminUP,
                semester: 1,
                tno: tno,
                cname: name,
                classid: classes,
                coverimg: 'default',
                status: '1'
            };
            let success = (e) => {
                // 成功
                if (e.code === 200) {
                    toastr.success(e.message);
                    $('.add-new-course').hide(250);
                    refresh();
                } else {
                    toastr.error(e.message);
                }
            };
            // 新建
            my_ajax(url, param, success);
        });
    }
}