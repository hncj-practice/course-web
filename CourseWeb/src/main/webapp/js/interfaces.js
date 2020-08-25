/**
 * API接口
 * 统一管理API接口，方便进行替换
 */


/**
 * 账户相关操作
 */
const ACCOUNT_API = {
    // 重置
    RESET_BY_ADMIN: 'http://123.56.156.212/Interface/account/resetpwdbyadmin',
    // 删除用户
    DELETE: 'http://123.56.156.212/Interface/account/delete'
};

/**
 * 教师用户相关操作
 */
const TEACHER_API = {
    // 添加教师
    ADD: 'http://123.56.156.212/Interface/account/addteacher',
    // 查询教师
    FIND: 'http://123.56.156.212/Interface/teacher/allteacher'
};

/**
 * 学生用户相关操作
 */
const STUDENT_API = {
    // 添加学生
    ADD: 'http://123.56.156.212/Interface/account/addstudent',
    // 查询学生
    FIND: 'http://123.56.156.212/Interface/student/allstudent'
};