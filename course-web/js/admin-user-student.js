/**
 * 管理员页面 - 用户管理 - 学生
 */

const STUDENT_PER_PAGE = 14;

// 入口函数
$(function () {
    console.log('学生用户管理');

    // 刷新
    (async function () {
        await refreshStudents(1, STUDENT_PER_PAGE);
    })();

});


// 刷新学生用户表格
async function refreshStudents(page, num) {
    if (!page) page = 1;
    if (!num) num = STUDENT_PER_PAGE;

    let url = API.STUDENT_API.FIND;
    let param = {
        page: page,
        num: num
    };
    const [err, data] = await awaitWrap(post(url, param));
    await process([err, data], renderStudentTable(data));
}


// 渲染学生用户表格
function renderStudentTable(data) {
    console.log(data);
    // 判断有没有数据
    if (data.code === 401) {
        toastr.warning('没有数据');
        return;
    }
    // 处理数据
    let studentTable = $('#studentTable');
    let html = '';
    let sno, name, cla, sex, email;

    // noinspection DuplicatedCode
    data.data.forEach((item) => {
        sno = item['sno'];
        name = item['name'];
        cla = item['cla'];
        sex = '男';
        if (item['sex'] === 'f') {
            sex = '女';
        }
        email = item['email'];
        // noinspection all
        html += `
        <tr>
            <td>
                <input class="check-student" sno="${sno}" cla="${cla}" type="checkbox"/>
                ${sno}
            </td>
            <td>${name}</td>
            <td>${cla}</td>
            <td>${sex}</td>
            <td>${email}</td>
            <td>OK</td>
            <td class="options">
                <span sno="${sno}" class="reset-user reset-student">重置</span>
                <span sno="${sno}" class="delete-user delete-student">删除</span>
            </td>
        </tr>`;
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
    // 学生用户操作
    {
        // 添加学生
        {
            $('#addStudent').off('click');
            $('#addStudent').click(async () => {
                console.log('点击添加学生');
                let sno = $('#snoAdd').val();
                let sname = $('#snameAdd').val();
                let scla = $('#sclaAdd').val();
                let ssex = $('#ssexAdd').val();
                let semail = $('#semailAdd').val();
                // 简单检验参数
                if (testFailed(sno, sname, scla, ssex, semail)) {
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
                showWarning(body, () => {
                    // 处理性别
                    if (ssex === '女') {
                        ssex = 'f';
                    } else {
                        ssex = 'm';
                    }
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
                    addUser('student', param, refreshStudents);
                });
            });
        }

        // 删除学生
        {
            $('.delete-student').off('click');
            $('.delete-student').click(async (e) => {
                let sno = $(e.target).attr('sno');
                console.log('点击：删除 ' + sno);
                let body = '确定删除学生用户？<br>学号：' + sno;
                showWarning(body, () => {
                    deleteUser(Entity.STUDENT, sno, refreshStudents);
                });
            });
        }

        // 重置学生
        {
            $('.reset-student').off('click');
            $('.reset-student').click(async (e) => {
                let sno = $(e.target).attr('sno');
                console.log('点击：重置 ' + sno);
                let body = '确定重置学生用户？<br>学号：' + sno;
                // 弹出提示
                showWarning(body, () => {
                    resetUser(Entity.STUDENT, sno);
                });
            });
        }

        // 批量删除学生
        {
            $('#deleteSAll').off('click');
            $('#deleteSAll').click(async () => {
                console.log('批量删除学生');
                // 拿到所有的复选框
                let checkedStudents = $('.check-student');
                // 所选教师集合
                let students = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedStudents, (index, item) => {
                    if (item.checked) {
                        students.push($(item).attr('sno'));
                    }
                });
                if (students.length < 1) {
                    toastr.warning('请选中学生');
                    return;
                }
                let body = '确定删除以下学生：<br>学号：' + students.join('<br>学号：');
                // 删除完成标志
                let n = 0;
                showWarning(body, () => {
                    students.forEach((sno) => {
                        deleteUser(Entity.STUDENT, sno, () => {
                            n++;
                            // 刷新表格
                            if (n === students.length) {
                                toastr.success('成功删除所选学生！');
                                refreshStudents(1, STUDENT_PER_PAGE);
                            }
                        });
                    });
                });
            });
        }

        // 批量重置学生
        {
            $('#resetSAll').off('click');
            $('#resetSAll').click(async () => {
                console.log('批量重置学生');
                // 拿到所有的复选框
                let checkedStudents = $('.check-student');
                // 所选教师集合
                let students = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedStudents, (index, item) => {
                    if (item.checked) {
                        students.push($(item).attr('sno'));
                    }
                });
                if (students.length < 1) {
                    toastr.warning('请选中学生');
                    return;
                }
                let body = '确定重置以下学生：<br>学号：' + students.join('<br>学号：');

                // 重置完成标志
                let n = 0;
                showWarning(body, () => {
                    students.forEach((sno) => {
                        resetUser(Entity.STUDENT, sno, () => {
                            n++;
                            // 刷新表格
                            if (n === students.length) {
                                toastr.success('成功重置所选学生！');
                            }
                        });
                    });
                });

            });
        }

        // 删除整班学生
        {
            $('#deleteAllClsStudent').off('click');
            $('#deleteAllClsStudent').click(async () => {
                // 获取选择的学生
                // 拿到所有的复选框
                let checkedStudents = $('.check-student');
                // 所选班级的集合
                let classes = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedStudents, (index, item) => {
                    if (item.checked) {
                        classes.push($(item).attr('cla'));
                    }
                });
                if (classes.length < 1) {
                    toastr.warning('请选中学生');
                    return;
                } else if (classes.length > 1) {
                    toastr.warning('请选中一名学生！');
                    return;
                }
                toastr.warning('用户将要删除整班学生！');
                let body = '删除 ' + classes[0] + ' 班所有学生？<br>该班级也会被一并删除！<br>该操作不能撤销!!';
                showWarning(body, async () => {
                    let flag = confirm('再次确认');
                    if (!flag) {
                        toastr.info('操作已取消');
                        return;
                    }
                    // 调用API删除
                    console.log('删除整班学生');
                    let url = API.CLASS_API.DELETE;
                    let param = {
                        adminuser: adminUN,
                        adminpwd: adminUP,
                        classid: classes[0]
                    };
                    let [err, data] = await awaitWrap(post(url, param));
                    if (data) {
                        toastr.success(data.message);
                        await refreshStudents();
                    } else {
                        toastr.error(err);
                    }
                });
            });
        }

        // 批量导入学生
        {
            // 下载模板
            $('#downloadTemplateS').attr('href', STATIC.STUDENT_TEMPLATE);
            // 按钮的点击事件
            $('#batchSImport').off('click');
            $('#addStudentExcel').off('click');
            $('#batchSImport').click(() => {
                return $('#batchSImportInput').click();
            });
            $('#addStudentExcel').click(() => {
                return $('#batchSImportInput').click();
            });
            // input file的change事件
            $('#batchSImportInput').off('change');
            $('#batchSImportInput').change(async (e) => {
                let files = e.target.files;
                // 解析文件内容成obj数组
                resolveXlsx(false, files, (list) => {
                    list.forEach((item, index) => {
                        // 请求添加教师API
                        let param = {
                            sno: item['sno'],
                            cla: item['sclass'],
                            pwd: "000000",
                            name: item['sname'],
                            sex: item['ssex'],
                            email: item['semail'],
                            avatar: "default",
                            status: 1
                        };
                        // 最后一次成功回调后刷新页面
                        if (index === list.length - 1) {
                            // addStudent(param, refreshStudents(1, STUDENT_PER_PAGE));
                            addUser('student', param, refreshStudents);
                            // 最后置value为null，修复onchange只能触发一次的bug
                            e.target.value = null;
                        } else {
                            // addStudent(param);
                            addUser('student', param);
                        }
                    });
                });
            });
        }
    }
}