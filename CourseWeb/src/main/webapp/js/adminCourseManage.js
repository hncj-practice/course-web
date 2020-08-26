/**
 * 管理员-课程管理菜单相关操作
 */

// 加载用户页面
function loadCoursePage() {
    console.log('切换到课程管理');
    refreshCourses()
}

// 刷新课程列表
function refreshCourses() {
    let url = COURSE_API.FIND;
    let param = {
        page: 1,
        num: 14
    };

    setTimeout(() => {
        // noinspection JSUnresolvedVariable
        jQuery.ajax({
            type: "POST",
            url: url,
            data: param,
            traditional: true,
            timeout: 5000,
            success: renderCourseTable,
            error: () => {
                toastr.error('查询失败：服务器异常');
            }
        });
    }, 500);
}

// 渲染课程列表
function renderCourseTable(obj) {
    console.log(obj);
    // 没有查到数据
    if (obj.code === 401) {
        toastr.warning('没有数据');
        return;
    }
    // 处理数据
    let courseTable = $('#courseTable');
    let html = '';
    let cid, cname, tname, status;
    obj.data.forEach((item) => {
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

    courseTable.html(html);

    // 元素生成后添加事件
    loadCourseEvents();

}


// 加载课程管理相关事件
function loadCourseEvents() {

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
                    courseid: cid
                };
                // noinspection all
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: param,
                    traditional: true,
                    timeout: 5000,
                    success: (e) => {
                        // 成功
                        if (e.code === 200) {
                            toastr.success(e.message);
                            refreshCourses();
                        } else {
                            toastr.error(e.message);
                        }
                    },
                    error: (e) => {
                        toastr.error(e.message);
                    }
                });
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
            myBootstrapModel('警告', body, '确定', '取消', () => {
                // 请求API修改
                let url = COURSE_API.UPDATE;
                // noinspection DuplicatedCode
                let param = {
                    courseid: cid,
                    name: newName
                };
                // noinspection all
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: param,
                    traditional: true,
                    timeout: 5000,
                    success: (e) => {
                        // 成功
                        if (e.code === 200) {
                            toastr.success(e.message);
                        } else {
                            toastr.error(e.message);
                        }
                    },
                    error: (e) => {
                        toastr.error(e.message);
                    }
                });
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
                // noinspection DuplicatedCode
                let param = {};
                // noinspection all
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: param,
                    traditional: true,
                    timeout: 5000,
                    success: (e) => {
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
                    },
                    error: (e) => {
                        toastr.error(e.message);
                    }
                });
            }
            // 加载所有班级信息，放在下拉框里面
            {
                let url = CLASS_API.FIND;
                // noinspection DuplicatedCode
                let param = {};
                // noinspection all
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: param,
                    traditional: true,
                    timeout: 5000,
                    success: (e) => {
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
                    },
                    error: (e) => {
                        toastr.error(e.message);
                    }
                });
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
            let url = CLASS_API.ADD;
            let param = {
                semester: '2020_09',
                tno: tno,
                cname: name,
                classid: classes,
                coverimg: 'default',
                status: '1'
            };

            // 新建
            // noinspection JSUnresolvedVariable
            jQuery.ajax({
                type: "POST",
                url: url,
                data: param,
                traditional: true,
                timeout: 5000,
                success: (e) => {
                    // 成功
                    if (e.code === 200) {
                        toastr.success(e.message);
                        $('.add-new-course').hide(250);
                        refreshCourses();
                    } else {
                        toastr.error(e.message);
                    }
                },
                error: (e) => {
                    toastr.error(e.message);
                }
            });
        });
    }


}