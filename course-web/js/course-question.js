/**
 * 课程 - 章节题目页面
 */


// 入口函数
$(function () {
    // 加载章节信息
    (async () => {
        await loadChapters();
    })();
});


async function loadChapters() {
    let cid = parent.currCourseId;
    let url = API.CHAPTER_API.FIND;


    let [err, data] = await awaitWrap(post(url, {
        courseid: cid
    }));

    if (err) {
        toastr.error(err);
    } else {
        let chapters = data.data;

        console.log(chapters);
        let html = '';
        chapters.forEach(chapter => {
            console.log(chapter);
            html += `
            <li><a href="teacher-question.html?chapter=${chapter['chapterid']}&sign=${md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])}" target="_blank">${chapter['chaptername']}</a></li>
            `;
        });

        $('.chapters-ul').html(html);


    }

}