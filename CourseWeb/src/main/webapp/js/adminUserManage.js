/**
 * 管理员-用户管理菜单相关操作
 */

// 定义一些常量
// 每页展示的教师数
const TEACHER_PER_PAGE = 14;
const STUDENT_PER_PAGE = 14;
// 当前教师列表的页数
let curr_page_teacher = 1;
// 教师列表总页数
let total_page_teacher = 1;

// 入口函数
$(function () {
    switchTab();
    // 默认加载用户页面
    loadUserPage();
});

// 加载用户页面
function loadUserPage() {
    refreshTeachers();
}


// 刷新教师用户表格
function refreshTeachers() {
    let url = TEACHER_API.FIND;
    let param = {
        // page: page,
        page: curr_page_teacher,
        num: TEACHER_PER_PAGE
    };

    setTimeout(() => {
        my_ajax(url, param, renderTeacherTable);
    }, 500);
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
                <input class="check-teacher" tno="{0}" type="checkbox" />
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


    // 渲染页码
    {
        // 拿到教师总人数
        let total = obj['data'][0]['total'];
        // 计算出有多少页
        if (total % TEACHER_PER_PAGE === 0) {
            total_page_teacher = parseInt(total / TEACHER_PER_PAGE);
        } else {
            total_page_teacher = parseInt(total / TEACHER_PER_PAGE) + 1;
        }
        $('#pEnd_t').text('末页' + total_page_teacher);

        // 取消所有激活页码
        $('.pages li').removeClass('active');
        $('.pages li .pg-t').css('display', 'none');

        if (total_page_teacher < 5) {
            // 根据页数显示前几页
            for (let i = 1; i <= total_page_teacher; i++) {
                let id = '#p' + i + '_t';
                $(id).css('display', 'block');
            }
            $('#p' + curr_page_teacher + '_t').parent('li').addClass('active');
        } else {
            // 显示所有页码
            {
                $('#p1_t').css('display', 'block');
                $('#p2_t').css('display', 'block');
                $('#p3_t').css('display', 'block');
                $('#p4_t').css('display', 'block');
                $('#p5_t').css('display', 'block');
            }
            // 显示当前激活的页码
            let arr = [1, 2, 3, 4, 5];
            {
                let p = 1;
                if (curr_page_teacher <= 3) {
                    p = curr_page_teacher;
                }
                if (curr_page_teacher >= 3 && curr_page_teacher <= (total_page_teacher - 2)) {
                    p = 3;
                    arr[0] = curr_page_teacher - 2;
                    arr[1] = curr_page_teacher - 1;
                    arr[2] = curr_page_teacher;
                    arr[3] = curr_page_teacher + 1;
                    arr[4] = curr_page_teacher + 2;
                }
                if (curr_page_teacher === total_page_teacher - 1 || curr_page_teacher === total_page_teacher) {
                    p = 4;
                    if (curr_page_teacher === total_page_teacher) {
                        p = 5;
                    }
                    arr[0] = total_page_teacher - 4;
                    arr[1] = total_page_teacher - 3;
                    arr[2] = total_page_teacher - 2;
                    arr[3] = total_page_teacher - 1;
                    arr[4] = total_page_teacher;
                }
                $('#p' + p + '_t').parent('li').addClass('active');
            }
            // 显示正确的页码
            {
                arr.forEach((n, i) => {
                    let id = '#p' + (i + 1) + '_t';
                    $(id).text(n);
                });
            }
        }
    }


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
            refreshTeachers();
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
                        let url = ACCOUNT_API.RESET_BY_ADMIN;
                        // noinspection DuplicatedCode
                        let param = {
                            adminuser: adminUN,
                            adminpwd: adminUP,
                            username: tno,
                            type: 2
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
                    let url = ACCOUNT_API.DELETE;
                    let param = {
                        adminuser: adminUN,
                        adminpwd: adminUP,
                        username: tno,
                        type: 2
                    };
                    let success = (e) => {
                        // 删除成功
                        if (e.code === 200) {
                            toastr.success(e.message);
                        } else {
                            toastr.error(e.message);
                        }
                        // 刷新表格
                        refreshTeachers();
                    };
                    my_ajax(url, param, success);
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
                    let param = {
                        tno: tno,
                        pwd: "000000",
                        name: tname,
                        sex: tsex,
                        email: temail,
                        avatar: "default",
                        status: 1
                    };
                    addTeacher(param, refreshTeachers);
                });
            });
        }

        // 批量删除教师
        {
            $('#deleteTAll').off('click');
            $('#deleteTAll').click(() => {
                console.log('批量删除教师');
                // 拿到所有的复选框
                let checkedTeachers = $('.check-teacher');
                // 所选教师集合
                let ts = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedTeachers, (index, item) => {
                    if (item.checked) {
                        ts.push($(item).attr('tno'));
                    }
                });
                if (ts.length < 1) {
                    toastr.warning('请选中教师');
                    return;
                }
                let body = '确定删除以下教师：<br>工号：' + ts.join('<br>工号：');

                // 删除完成标志
                let n = 0;
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    // 遍历删除
                    ts.forEach((item) => {
                        // noinspection all,DuplicatedCode
                        let url = ACCOUNT_API.DELETE;
                        let param = {
                            adminuser: adminUN,
                            adminpwd: adminUP,
                            username: item,
                            type: 2
                        };
                        let success = (e) => {
                            // 删除成功
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            n++;
                            // 所有都删除完成
                            if (n === ts.length) {
                                toastr.success('成功删除所选教师！');
                                refreshTeachers();
                            }
                        };
                        my_ajax(url, param, success);
                    });
                })
            });
        }

        // 批量重置教师
        {
            $('#resetTAll').off('click');
            $('#resetTAll').click(() => {
                console.log('批量教师');
                // 拿到所有的复选框
                let checkedTeachers = $('.check-teacher');
                // 所选教师集合
                let ts = [];
                // 遍历
                // noinspection JSUnresolvedVariable
                jQuery.each(checkedTeachers, (index, item) => {
                    if (item.checked) {
                        ts.push($(item).attr('tno'));
                    }
                });
                if (ts.length < 1) {
                    toastr.warning('请选中教师');
                    return;
                }
                let body = '确定重置以下教师：<br>工号：' + ts.join('<br>工号：');
                let n = 0;
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    // 遍历删除
                    ts.forEach((item) => {
                        // noinspection all,DuplicatedCode
                        let url = ACCOUNT_API.RESET_BY_ADMIN;
                        let param = {
                            adminuser: adminUN,
                            adminpwd: adminUP,
                            username: item,
                            type: 2
                        };
                        let success = (e) => {
                            // 成功
                            if (e.code === 200) {
                                toastr.success(e.message);
                            } else {
                                toastr.error(e.message);
                            }
                            n++;
                            // 所有都完成
                            if (n === ts.length) {
                                toastr.success('成功重置所选教师！');
                            }
                        };
                        my_ajax(url, param, success);
                    });
                });
            });
        }

        // 批量导入教师
        {
            // 按钮的点击事件
            $('#batchTImport').off('click');
            $('#batchTImport').click(() => {
                return $('#batchTImportInput').click();
                // $('batchTImportInput').trigger('click');
            });
            // input file的事件
            $('#batchTImportInput').off('change');
            $('#batchTImportInput').change((e) => {
                var wb; //读取完成的数据
                var rABS = false; //是否将文件读取为二进制字符串
                let obj = e.target;
                if (!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    let list = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

                    console.log('list');
                    console.log(list);

                    jQuery.each(list, (index, item) => {
                        let param = {
                            tno: item['tno'],
                            pwd: "000000",
                            name: item['tname'],
                            sex: item['tsex'],
                            email: item['temail'],
                            avatar: "default",
                            status: 1
                        };
                        addTeacher(param);
                    });

                };
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            });


        }

        // 底部页面跳转
        {
            // 5个活动页码跳转
            $('.pg-t').off('click');
            $('.pg-t').click((e) => {
                let page = $(e.target).text();
                // console.log('跳转到' + page);
                curr_page_teacher = parseInt(page);
                refreshTeachers()
            });

            // 首页
            $('#pStart_t').off('click');
            $('#pStart_t').click(() => {
                curr_page_teacher = 1;
                refreshTeachers()
            });

            // 末页
            $('#pEnd_t').off('click');
            $('#pEnd_t').click(() => {
                curr_page_teacher = total_page_teacher;
                refreshTeachers()
            });

            // 下一页
            $('#pNext_t').off('click');
            $('#pNext_t').click(() => {
                if (curr_page_teacher === total_page_teacher) return;
                curr_page_teacher += 1;
                refreshTeachers()
            });

            // 上一页
            $('#pPrev_t').off('click');
            $('#pPrev_t').click(() => {
                if (curr_page_teacher === 1) return;
                curr_page_teacher -= 1;
                refreshTeachers()
            });

            // 指定页
            $('#pDist_t').off('click');
            $('#pDist_t').click(() => {
                let page = parseInt($('#jumpT').val());
                if (page >= 1 && page <= total_page_teacher) {
                    curr_page_teacher = page;
                    $('#jumpT').val('');
                    refreshTeachers()
                } else {
                    toastr.warning('请输入正确页码！');
                }
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
                    let url = STUDENT_API.ADD;
                    let param = {
                        adminuser: adminUN,
                        adminpwd: adminUP,
                        sno: sno,
                        cla: scla,
                        pwd: "000000",
                        name: sname,
                        sex: ssex,
                        email: semail,
                        avatar: "default",
                        status: 0
                    };
                    my_ajax(url, param, (e) => {
                        if (e.code === 200) {
                            toastr.success(e.message);
                        } else {
                            toastr.error(e.message);
                            return;
                        }
                        // 刷新表格
                        refreshStudents(1, STUDENT_PER_PAGE);
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
    }
}

// 单独添加教师
function addTeacher(param, callback) {
    console.log('my Add');
    let url = TEACHER_API.ADD;
    param['adminuser'] = adminUN;
    param['adminpwd'] = adminUP;

    // console.log(param);

    let success = (e) => {
        if (e.code === 200) {
            toastr.success(e.message);
            if (!callback) {
                return;
            }
            callback();
        } else {
            toastr.error(e.message);
        }
    };
    my_ajax(url, param, success);
}