/**
 * 管理员 - 用户管理公共函数
 */

// 添加一个用户
const addUser = async (type, param, success) => {
    // 根据用户类型选择相应的API
    let url = (type === 'teacher') ? TEACHER_API.ADD : STUDENT_API.ADD;
    // 添加上管理员权限
    param['adminuser'] = adminUN;
    param['adminpwd'] = adminUP;

    // 调用API添加
    const [err, data] = await awaitWrap(post(url, param));

    if (err) {
        toastr.error(err);
    } else {
        toastr.success(data.message);
        // 如果有回调，执行回调
        if (success) {
            success();
        }
    }
};

