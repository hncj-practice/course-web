/**
 * 管理员 - 用户管理公共函数
 */

// let adminUN = '';
// let adminUP = '';

// // 添加用户
// const addUser = (type, param, success) => {
//
// };

// 单独添加教师
function addTeacher(param, success) {
    // 添加上管理员权限
    param['adminuser'] = adminUN;
    param['adminpwd'] = adminUP;

    let url = TEACHER_API.ADD;
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