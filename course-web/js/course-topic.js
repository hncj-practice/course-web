/**
 * 课程 - 话题页面
 */


// 入口函数
$(function () {
    // 加载试卷信息
    (async () => {
        await loadTopics();
    })();
});


// 加载话题
async function loadTopics() {
    let cid = parent.currCourseId;
    let url = API.TOPIC_APT.FIND;

    let [err, data] = await awaitWrap(post(url, {
        courseid: cid
    }));


    if (err) {
        toastr.error(err);
    } else {
        let topics = data.data;
        let html = '';

        topics.forEach(topic => {

            html += `
            <li>
                <div class="left">
                    <img src="${localStorage['course-web-curr-teacher-avatar']}" alt="">
                </div>
                <div class="right">
                    <h4 class="topic-time">${formatTime(topic['committime'])}</h4>
                    <h3 class="topic-title">${topic['topictitle']}</h3>
                    <h4 class="topic-content">${topic['topiccontent']}</h4>
                </div>
            </li>
            `;

        });

        $('.topics-ul').html(html);
    }

}