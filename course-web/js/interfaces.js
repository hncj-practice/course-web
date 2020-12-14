/**
 * API接口
 * 统一管理API接口，方便进行替换
 */

/**
 *  静态资源
 */
const STATIC = {
    TEACHER_TEMPLATE: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/kczs/static/teacher_template.xlsx',
    STUDENT_TEMPLATE: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/kczs/static/student_template.xlsx',
    QUESTION_TEMPLATE: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/kczs/static/question_template.xlsx',
};


/**
 * 定义错误码
 */
const ErrorCode = {
    10001: '服务器异常 [错误码：10001]',
    10002: '服务器忙碌 [错误码：10002]',
    10003: '服务器拒绝 [错误码：10003]',
};


// 主机地址
const HOST = 'http://123.56.156.212/Interface';


// noinspection SpellCheckingInspection
const API = {
    ACCOUNT_API: {
        // 登录
        LOGIN: 'http://123.56.156.212/Interface/account/login',
        // 重置
        RESET_BY_ADMIN: HOST + '/account/resetpwdbyadmin',
        // 删除用户
        DELETE: HOST + '/account/delete'
    },

    TEACHER_API: {
        // 添加教师
        ADD: HOST + '/account/addteacher',
        // 查询教师
        FIND: HOST + '/teacher/allteacher'
    },

    STUDENT_API: {
        // 添加学生
        ADD: HOST + '/account/addstudent',
        // 查询学生
        FIND: HOST + '/student/allstudent'
    },

    CLASS_API: {
        // 查询
        FIND: HOST + '/class/allclass',

        // 删除班级
        DELETE: HOST + '/class/delclass'
    },

    COURSE_API: {
        // 添加
        ADD: HOST + '/course/addcourse',
        // 查询课程
        FIND: HOST + '/course/allcourse',
        // 根据教师或名字查询查询
        FIND_BY: HOST + '/course/getcoursebytnoorcoursename',
        // 删除
        DELETE: HOST + '/course/delcourse',
        // 修改
        UPDATE: HOST + '/course/updatecourse'
    },

    CHAPTER_API: {
        // 查询
        FIND: HOST + '/chapter/getchapterbycourseid'
    },

    PAPER_API: {
        FIND: HOST + '/paper/getpaperbycourseid',

        RANDOM_PAPER: HOST + '/paper/randomgenerate',

        // 创建试卷
        NEW: HOST + '/paper/addpaper',

        // 给试卷添加试题
        ADD: HOST + '/paper/addproblems',

        // 删除
        DELETE: HOST + '/paper/delpaper'
    },

    TOPIC_APT: {
        // 查询
        FIND: HOST + '/topic/gettopicbycid',

        DELETE: HOST + '/topic/deltopic',
    },

    QUESTION_API: {
        // 添加
        ADD: HOST + '/problem/addproblem',
        // 查询
        FIND: HOST + '/problem/getproblembychapterid'
    }
};

