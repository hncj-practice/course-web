/**
 * 管理员页面 - 用户管理 - 教师
 */

// 每页展示的教师数
const TEACHER_PER_PAGE = 14;

// 当前教师列表的页数
let curr_page_teacher = 1;

// 入口函数
$(function () {
    console.log('教师用户管理');

    refresh();
});

// 刷新教师用户表格
function refresh() {

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
        $('#pEnd_t').text('末页 ' + total_page_teacher);

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


// 事件
function loadEvents() {

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
            $('.delete-teacher').click(async (e) => {
                let tno = $(e.target).attr('tno');
                console.log('点击：删除 ' + tno);
                let body = `确定删除教师用户？<br>工号：${tno}`;
                // 弹出提示
                showWarning(body, () => {
                    console.log('删除：' + tno);
                    // 请求API删除
                    deleteUser(Entity.TEACHER, tno, refreshTeachers);
                });
            });
        }

        // 单独添加教师
        {
            $('#addTeacher').off('click');
            $('#addTeacher').click(async () => {
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
                let body = `
                    确定添加教师用户？<br>
                    工号：${tno}<br>
                    姓名：${tname}<br>
                    性别：${tsex}<br>
                    邮箱：${temail}`;
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
                        pwd: "000000", // 默认密码
                        name: tname,
                        sex: tsex,
                        email: temail,
                        avatar: "default", // 默认头像
                        status: 1
                    };
                    addUser('teacher', param, refreshTeachers);
                });
            });
        }

        // 批量删除教师
        {
            $('#deleteTAll').off('click');
            $('#deleteTAll').click(async () => {
                console.log('批量删除教师');
                // 拿到所有的复选框
                let checkedTeachers = $('.check-teacher');
                // 所选教师集合
                let teachers = [];
                // 遍历
                jQuery.each(checkedTeachers, (index, item) => {
                    if (item.checked) {
                        teachers.push($(item).attr('tno'));
                    }
                });
                if (teachers.length < 1) {
                    toastr.warning('请选中教师');
                    return;
                }
                let body = '确定删除以下教师：<br>工号：' + teachers.join('<br>工号：');

                // 删除计数器
                let n = 0;
                myBootstrapModel('警告', body, '确定', '取消', () => {
                    // 遍历删除
                    teachers.forEach(tno => {
                        deleteUser(Entity.TEACHER, tno, () => {
                            // 计数器
                            n++;
                            // 所有都删除完成
                            if (n === teachers.length) {
                                toastr.success('成功删除所选教师！');
                                refreshTeachers();
                            }
                        });
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
            // 下载模板
            $('#downloadTemplateT').attr('href', STATIC.TEACHER_TEMPLATE);
            // 按钮的点击事件
            $('#batchTImport').off('click');
            $('#addTeacherExcel').off('click');
            $('#batchTImport').click(() => {
                return $('#batchTImportInput').click();
            });
            $('#addTeacherExcel').click(() => {
                return $('#batchTImportInput').click();
            });
            // input file的change事件
            $('#batchTImportInput').off('change');
            $('#batchTImportInput').change(async (e) => {
                let files = e.target.files;
                // 解析文件内容成obj数组
                resolveXlsx(false, files, (list) => {
                    list.forEach((item, index) => {
                        // 请求添加教师API
                        let param = {
                            tno: item['tno'],
                            pwd: "000000",
                            name: item['tname'],
                            sex: item['tsex'],
                            email: item['temail'],
                            avatar: "default",
                            status: 1
                        };
                        // 最后一次成功回调后刷新页面
                        if (index === list.length - 1) {
                            addUser('teacher', param, refreshTeachers);
                            // 最后置value为null，修复onchange只能触发一次的bug
                            e.target.value = null;
                        } else {
                            addUser('teacher', param);
                        }
                    });
                });
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

        // 全选教师
        {
            $('#selectTAll').off('click');
            $('#selectTAll').click(() => {
                console.log('全选');
                // 获取当前页面所有的checkbox，设置为选择状态
                let checks = $('.check-teacher');
                // 否则就全部取消选中
                checks.attr('checked', true);
            });
        }
    }

}

