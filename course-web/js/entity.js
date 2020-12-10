/**
 * 定义实体类
 */

/**
 * 实体
 */
const Entity = {
    TEACHER: 'teacher',
    STUDENT: 'student',
    CLASS: 'class'
};


/**
 * 获取某个实体的所有信息
 * @param {Entity} entity
 * @returns {Promise}
 */
function getEntities(entity) {
    let url;
    switch (entity) {
        case Entity.TEACHER:
            url = API.TEACHER_API.FIND;
            break;
        case Entity.STUDENT:
            url = API.STUDENT_API.FIND;
            break;
        case Entity.CLASS:
            url = API.CLASS_API.FIND;
            break;
    }

    return new Promise((resolve, reject) => {
        post(url, {}).then(data => {
            if (data.code === 200) {
                resolve(data.data);
            } else {
                if (data.message) {
                    reject(data.message);
                } else {
                    reject(ErrorCode["10001"]);
                }
            }
        }).catch(reason => {
            reject(reason);
        });
    });

}