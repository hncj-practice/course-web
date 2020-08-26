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
    let url = COURSE_API.FIND_BY;
    let param = {
        condition: '888888888',
        page: 1,
        num: 14,
        type: 1
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
            error: (e) => {
                toastr.error(e.message);
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
            <td><input class="course-name" type="text" value="{1}"></td>
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
            console.log('删除' + cid);
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
}