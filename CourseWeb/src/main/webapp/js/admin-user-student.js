/**
 * 管理员页面 - 用户管理 - 学生
 */

const STUDENT_PER_PAGE = 14;

let adminUN = 'wsgly';
let adminUP = '000000';

// 入口函数
$(function () {
    console.log('学生用户管理');

    refresh();
});

function refresh() {
    refreshStudents(1, STUDENT_PER_PAGE);
}


// 刷新学生用户表格
function refreshStudents(page, num) {
    let url = STUDENT_API.FIND;
    let param = {
        page: page,
        num: num
    };
    let error = () => {
        toastr.error('获取数据失败！');
    };
    setTimeout(() => {
        my_ajax(url, param, renderStudentTable, error);
    }, 500);
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
                <input class="check-student" sno="{0}" cla="{2}" type="checkbox"/>
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
                    addStudent(param, refreshStudents(1, STUDENT_PER_PAGE));
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
                    let url = ACCOUNT_API.DELETE;
                    let param = {
                        adminuser: adminUN,
                        adminpwd: adminUP,
                        username: sno,
                        type: 1
                    };
                    let success = (e) => {
                        // 删除成功
                        if (e.code === 200) {
                            toastr.success(e.message);
                        } else {
                            toastr.error(e.message);
                        }
                        // 刷新表格
                        refreshStudents(1, STUDENT_PER_PAGE);
                    };
                    my_ajax(url, param, success);
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
                        let url = ACCOUNT_API.RESET_BY_ADMIN;
                        // noinspection DuplicatedCode
                        let param = {
                            adminuser: adminUN,
                            adminpwd: adminUP,
                            username: sno,
                            type: 1
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

        // 批量删除学生
        {
            $('#deleteSAll').off('click');
            $('#deleteSAll').click(() => {
                console.log('批量删除学生');
                // 拿到所有的复选框
                let checkedStudents = $('.check-student');
                // 所选教师集合
                let ss = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedStudents, (index, item) => {
                    if (item.checked) {
                        ss.push($(item).attr('sno'));
                    }
                });
                if (ss.length < 1) {
                    toastr.warning('请选中学生');
                    return;
                }
                let body = '确定删除以下学生：<br>学号：' + ss.join('<br>学号：');

                // 删除完成标志
                let n = 0;
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    ss.forEach((item) => {
                        // noinspection DuplicatedCode
                        let url = ACCOUNT_API.DELETE;
                        let param = {
                            adminuser: adminUN,
                            adminpwd: adminUP,
                            username: item,
                            type: 1
                        };
                        let success = (e) => {
                            // 删除成功
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            n++;
                            // 刷新表格
                            if (n === ss.length) {
                                toastr.success('成功删除所选学生！');
                                refreshStudents(1, STUDENT_PER_PAGE);
                            }
                        };
                        my_ajax(url, param, success);
                    });
                })
            });
        }

        // 批量重置学生
        {
            $('#resetSAll').off('click');
            $('#resetSAll').click(() => {
                console.log('批量重置学生');
                // 拿到所有的复选框
                let checkedStudents = $('.check-student');
                // 所选教师集合
                let ss = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedStudents, (index, item) => {
                    if (item.checked) {
                        ss.push($(item).attr('sno'));
                    }
                });
                if (ss.length < 1) {
                    toastr.warning('请选中学生');
                    return;
                }
                let body = '确定重置以下学生：<br>学号：' + ss.join('<br>学号：');

                // 删除完成标志
                let n = 0;
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    ss.forEach((item) => {
                        // noinspection DuplicatedCode
                        let url = ACCOUNT_API.RESET_BY_ADMIN;
                        let param = {
                            adminuser: adminUN,
                            adminpwd: adminUP,
                            username: item,
                            type: 1
                        };
                        // noinspection all
                        my_ajax(url, param, (e) => {
                            // 删除成功
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            n++;
                            // 刷新表格
                            if (n === ss.length) {
                                toastr.success('成功重置所选学生！');
                                refreshStudents(1, STUDENT_PER_PAGE);
                            }
                        });
                    });
                })
            });
        }

        // 删除整班学生
        {
            $('#deleteAllClsStudent').off('click');
            $('#deleteAllClsStudent').click(() => {
                // 获取选择的学生
                // 拿到所有的复选框
                let checkedStudents = $('.check-student');
                // 所选教师集合
                let ss = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedStudents, (index, item) => {
                    if (item.checked) {
                        ss.push($(item).attr('cla'));
                    }
                });
                if (ss.length < 1) {
                    toastr.warning('请选中学生');
                    return;
                } else if (ss.length > 1) {
                    toastr.warning('请选中一名学生！');
                    return;
                }

                toastr.warning('用户将要删除整班学生！');
                let body = '删除 ' + ss[0] + ' 班所有学生？<br>该班级也会被一并删除！<br>该操作不能撤销!!';
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    let flag = confirm('再次确认');
                    if (!flag) {
                        toastr.info('操作已取消');
                        return;
                    }
                    // 调用API删除
                    console.log('删除整班学生');
                    let url = CLASS_API.DELETE;
                    let param = {
                        adminuser: adminUN,
                        adminpwd: adminUP,
                        classid: ss[0]
                    };
                    let success = (e) => {
                        // 删除成功
                        if (e.code === 200) {
                            toastr.success(e.message);
                        } else {
                            toastr.error(e.message);
                        }
                        // 刷新表格
                        refreshStudents();
                    };
                    my_ajax(url, param, success);

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
            $('#batchSImportInput').change((e) => {
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
                            addStudent(param, refreshStudents(1, STUDENT_PER_PAGE));
                            // 最后置value为null，修复onchange只能触发一次的bug
                            e.target.value = null;
                        } else {
                            addStudent(param);
                        }
                    });
                });
            });
        }
    }
}

// 单独添加学生
function addStudent(param, success) {
    // 添加上管理员权限
    param['adminuser'] = adminUN;
    param['adminpwd'] = adminUP;

    let url = STUDENT_API.ADD;
    // 调用API添加
    post(url, param).then(e => {
        toastr.success(e.message);
        // 如果有回调，执行回调
        if (success) {
            success();
        }
    }).catch(reason => {
        toastr.error(reason);
    });
}