/**
 * 管理员 - 用户管理公共函数
 */

// 添加一个用户
async function addUser(type, param, success) {
    // 根据用户类型选择相应的API
    let url = (type === 'teacher') ? API.TEACHER_API.ADD : API.STUDENT_API.ADD;
    // 添加上管理员权限
    param['adminuser'] = adminUN;
    param['adminpwd'] = adminUP;

    // 调用API添加
    const [err, data] = await awaitWrap(post(url, param));

    // 处理结果
    await process([err,data], success);
}


/**
 * 删除用户
 * @param type
 * @param id
 * @param success
 * @returns {Promise}
 */
async function deleteUser(type, id, success) {
    let url = API.ACCOUNT_API.DELETE;
    let param = {
        adminuser: adminUN,
        adminpwd: adminUP,
        username: id,
        type: (type === Entity.STUDENT ? 1 : 2)
    };
    // post请求
    const [err, data] = await awaitWrap(post(url, param));

    // 处理结果
    await process([err,data], success);
}