/**
 * 管理员-用户管理菜单相关操作
 */

// 定义一些常量
// 每页展示的教师数
const TEACHER_PER_PAGE = 15;
const STUDENT_PER_PAGE = 15;


// 入口函数
$(function () {
    // 获取第一页数据
    refreshTeachers(1, TEACHER_PER_PAGE);


});


// 刷新教师用户表格
function refreshTeachers(page, num) {
    let url = 'http://123.56.156.212/Interface/teacher/allteacher';
    let param = {
        page: page,
        num: num
    };
    let error = () => {
        toastr.error('获取数据失败！');
    };
    setTimeout(() => {
        // noinspection JSUnresolvedVariable
        jQuery.ajax({
            type: "POST",
            url: url,
            data: param,
            traditional: true,
            timeout: 5000,
            success: renderTeacherTable,
            error: error
        });
    }, 500);
}

// 刷新学生用户表格
function refreshStudents(page, num) {
    let url = 'http://123.56.156.212/Interface/student/allstudent';
    let param = {
        page: page,
        num: num
    };
    let error = () => {
        toastr.error('获取数据失败！');
    };
    setTimeout(() => {
        // noinspection JSUnresolvedVariable
        jQuery.ajax({
            type: "POST",
            url: url,
            data: param,
            traditional: true,
            timeout: 5000,
            success: renderStudentTable,
            error: error
        });
    }, 500);
}

// 渲染教师用户表格
function renderTeacherTable(obj) {
    console.log(obj);
    // 判断有没有数据
    if (obj.code === 401) {
        toastr.warning('没有数据');
        return;
    }

    // 处理数据
    let teacherTable = $('#teacherTable');
    let html = '';
    let tno, name, sex, email;
    // noinspection DuplicatedCode
    obj.data.forEach((item) => {
        tno = item.tno;
        name = item.name;
        sex = '男';
        if (item.sex === 'f') {
            sex = '女';
        }
        email = item.email;

        // noinspection all
        html += `
        <tr>
            <td>
                <input type="checkbox" />
                {0}
            </td>
            <td>{1}</td>
            <td>{2}</td>
            <td>{3}</td>
            <td>OK</td>
            <td class="options">
                <span tno="{0}" class="reset-user reset-teacher">重置</span>
                <span tno="{0}" class="delete-user delete-teacher">删除</span>
            </td>
        </tr>
        `.format(tno, name, sex, email);
    });

    // 添加上最后一行

    html += `
    <tr class="add-user-tr">
        <td><input id="tnoAdd" type="text" placeholder="工号（9位）"></td>
        <td><input id="tnameAdd" type="text" placeholder="姓名"></td>
        <td><input id="tsexAdd" type="text" placeholder="性别（男/女）"></td>
        <td><input id="temailAdd" type="text" placeholder="邮箱"></td>
        <td>OK</td>
        <td class="options">
            <span class="add-user" id="addTeacher">添加</span>
            <span class="add-user-excel" id="addTeacherExcel">Excel导入</span>
        </td>
    </tr>
    `;
    teacherTable.html(html);
    // 每次请求完成后，添加对应的事件
    loadEvents();
}

// 渲染学生用户表格
function renderStudentTable(obj) {
    console.log(obj);
    // 判断有没有数据
    if (obj.code === 401) {
        toastr.warning('没有数据');
        return;
    }
    // 处理数据
    let studentTable = $('#studentTable');
    let html = '';
    let sno, name, cla, sex, email;


    // noinspection DuplicatedCode
    obj.data.forEach((item) => {
        sno = item['sno'];
        name = item['name'];
        cla = '班级';
        sex = '男';
        if (item['sex'] === 'f') {
            sex = '女';
        }
        email = item['email'];

        // noinspection all
        html += `
        <tr>
            <td>
                <input type="checkbox"/>
                {0}
            </td>
            <td>{1}</td>
            <td>{2}</td>
            <td>{3}</td>
            <td>{4}</td>
            <td>OK</td>
            <td class="options">
                <span sno="{0}" class="reset-user reset-student">重置</span>
                <span sno="{0}" class="delete-user delete-student">删除</span>
            </td>
        </tr>
        `.format(sno, name, cla, sex, email);
    });
    // 添加一行
    html += `
     <tr class="add-user-tr">
        <td><input id="snoAdd" type="text" placeholder="学号（9位）"></td>
        <td><input id="snameAdd" type="text" placeholder="姓名"></td>
        <td><input id="sclaAdd" type="text" placeholder="班级"></td>
        <td><input id="ssexAdd" type="text" placeholder="性别（男/女）"></td>
        <td><input id="semailAdd" type="text" placeholder="邮箱"></td>
        <td>OK</td>
        <td class="options">
            <span class="add-user" id="addStudent">添加</span>
            <span class="add-user-excel" id="addStudentExcel">Excel导入</span>
        </td>
    </tr>
    `;

    studentTable.html(html);
    // 每次请求完成后，添加对应的事件
    loadEvents();
}

// 事件
function loadEvents() {
    // 点击左侧切换
    {
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
        });

        change2Course.off('click');
        change2Course.click(() => {
            setClass(change2User, 'inactive', 'active');
            setClass(change2Course, 'active', 'inactive');
            userPanel.css('display', 'none');
            coursePanel.css('display', 'block');
        });
    }

    // 用户管理界面 切换教师/学生
    {
        let cg2Teacher = $('#cg2Teacher');
        let cg2Student = $('#cg2Student');
        let teacher = $('.teacher');
        let student = $('.student');

        // 切换到教师用列表
        cg2Teacher.off('click');
        cg2Teacher.click(() => {
            student.hide(200);
            teacher.show(200);
            // 获取第一页数据
            refreshTeachers(1, TEACHER_PER_PAGE);
        });
        // 切换到学生用户列表
        cg2Student.off('click');
        cg2Student.click(() => {
            teacher.hide(200);
            student.show(200);
            refreshStudents(1, STUDENT_PER_PAGE);
        });
    }


    // 教师用户操作
    {
        // 重置教师
        {
            $('.reset-teacher').off('click');
            $('.reset-teacher').click((e) => {
                let tno = $(e.target).attr('tno');
                console.log('点击：重置 ' + tno);
                let title = '提示';
                let body = '确定重置教师用户？<br>工号：' + tno;
                // 弹出提示
                myBootstrapModel(
                    title,
                    body,
                    '确定',
                    '取消',
                    () => {
                        console.log('重置：' + tno);
                        // 请求API重置
                        // let url = 'http://123.56.156.212/Interface/account/resetpwd';
                        // let param = {
                        //     username: tno,
                        //     password: "",
                        //     newpwd: "",
                        //     type: 2
                        // };
                    });
            });
        }

        // 删除教师
        {
            $('.delete-teacher').off('click');
            $('.delete-teacher').click((e) => {
                let tno = $(e.target).attr('tno');
                console.log('点击：删除 ' + tno);
                let title = '提示';
                let body = '确定删除教师用户？<br>工号：' + tno;
                // 弹出提示
                myBootstrapModel(title, body, '确定', '取消', () => {
                    console.log('删除：' + tno);
                    // 请求API删除
                    let url = 'http://123.56.156.212/Interface/account/delete';
                    let param = {
                        username: tno,
                        admin_user: adminUN,
                        admin_pwd: adminUP,
                        type: 2
                    };
                    // noinspection all
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: param,
                        traditional: true,
                        timeout: 5000,
                        success: (e) => {
                            // 删除成功
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            // 刷新表格
                            refreshTeachers(1, TEACHER_PER_PAGE);
                        },
                        error: (e) => {
                            toastr.error(e.message);
                        }
                    });
                });
            });
        }

        // 单独添加教师
        {
            $('#addTeacher').off('click');
            $('#addTeacher').click(() => {
                console.log('点击添加教师');
                let tno = $('#tnoAdd').val();
                let tname = $('#tnameAdd').val();
                let tsex = $('#tsexAdd').val();
                let temail = $('#temailAdd').val();

                // 简单检验参数
                if (isEmpty(tno) || isEmpty(tname) || isEmpty(tsex) || isEmpty(temail)) {
                    toastr.error("参数不能为空");
                    return;
                }

                // 添加确认提示
                let body = '确定添加教师用户？' + '<br>' +
                    '工号：' + tno + '<br>' +
                    '姓名：' + tname + '<br>' +
                    '性别：' + tsex + '<br>' +
                    '邮箱：' + temail;
                myBootstrapModel('提示', body, '确定', '取消', () => {
                    // 处理性别
                    if (tsex === '女') {
                        tsex = 'f';
                    } else {
                        tsex = 'm';
                    }
                    // 请求添加教师API
                    let url = 'http://123.56.156.212/Interface/account/addteacher';
                    let param = {
                        tno: tno,
                        pwd: "000000",
                        name: tname,
                        sex: tsex,
                        email: temail,
                        avatar: "default",
                        status: 1
                    };
                    // noinspection all
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: param,
                        traditional: true,
                        timeout: 5000,
                        success: (e) => {
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            // 刷新表格
                            refreshTeachers(1, TEACHER_PER_PAGE);
                        },
                        error: (e) => {
                            toastr.error(e.message);
                        }
                    });
                });
            });
        }
    }

    // 学生用户操作
    {
        // 添加学生
        {
            $('#addStudent').off('click');
            $('#addStudent').click(() => {
                console.log('点击添加学生');
                let sno = $('#snoAdd').val();
                let sname = $('#snameAdd').val();
                let scla = $('#sclaAdd').val();
                let ssex = $('#ssexAdd').val();
                let semail = $('#semailAdd').val();
                // 简单检验参数
                if (isEmpty(sno) || isEmpty(sname) || isEmpty(scla) || isEmpty(ssex) || isEmpty(semail)) {
                    toastr.error("参数不能为空");
                    return;
                }
                // 添加确认提示
                let body = '确定添加学生用户？' + '<br>' +
                    '学号：' + sno + '<br>' +
                    '姓名：' + sname + '<br>' +
                    '班级：' + scla + '<br>' +
                    '性别：' + ssex + '<br>' +
                    '邮箱：' + semail;
                myBootstrapModel('提示', body, '确定', '取消', () => {
                    // 处理性别
                    if (ssex === '女') {
                        ssex = 'f';
                    } else {
                        ssex = 'm';
                    }
                    let url = 'http://123.56.156.212/Interface/account/addstudent';
                    let param = {
                        sno: sno,
                        cla: scla,
                        pwd: "000000",
                        name: sname,
                        sex: ssex,
                        email: semail,
                        avatar: "default",
                        status: 0
                    };
                    // noinspection all
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: param,
                        traditional: true,
                        timeout: 5000,
                        success: (e) => {
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                                return;
                            }
                            // 刷新表格
                            refreshStudents(1, STUDENT_PER_PAGE);
                        },
                        error: (e) => {
                            toastr.error(e.message);
                        }
                    });
                });
            });
        }

        // 删除学生
        {
            $('.delete-student').off('click');
            $('.delete-student').click((e) => {
                let sno = $(e.target).attr('sno');
                console.log('点击：删除 ' + sno);
                let title = '提示';
                let body = '确定删除学生用户？<br>学号：' + sno;
                myBootstrapModel(title, body, '确定', '取消', () => {
                    // 请求API删除
                    let url = 'http://123.56.156.212/Interface/account/delete';
                    let param = {
                        username: sno,
                        admin_user: adminUN,
                        admin_pwd: adminUP,
                        type: 1
                    };
                    // noinspection all
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: param,
                        traditional: true,
                        timeout: 5000,
                        success: (e) => {
                            // 删除成功
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            // 刷新表格
                            refreshStudents(1, STUDENT_PER_PAGE);
                        },
                        error: (e) => {
                            toastr.error(e.message);
                        }
                    });
                });
            });
        }

        // 重置学生
        {
            $('.reset-student').off('click');
            $('.reset-student').click((e) => {
                let sno = $(e.target).attr('sno');
                console.log('点击：重置 ' + sno);
                let title = '提示';
                let body = '确定重置学生用户？<br>学号：' + sno;
                // 弹出提示
                myBootstrapModel(
                    title,
                    body,
                    '确定',
                    '取消',
                    () => {
                        console.log('重置：' + sno);
                        // 请求API重置

                    });
            });
        }

        // 删除整班学生
        {
            $('#deleteAllClsStudent').off('click');
            $('#deleteAllClsStudent').click(() => {
                toastr.warning('用户将要删除整班学生！');
                let body = '删除 xxx 班所有学生？<br>该操作不能撤销!!';
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    let flag = confirm('警告', '再次确认');
                    if (!flag) {
                        toastr.info('操作已取消');
                        return;
                    }
                    // 调用API删除
                    console.log('删除整班学生');
                });

            });
        }
    }
}

