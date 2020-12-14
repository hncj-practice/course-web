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
            let href = `
            chapter-question.html?
            chapter=${chapter['chapterid']}
            &chaptername=${encodeURIComponent(chapter['chaptername'])}
            &sign=${md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])}
            `.replace(/\s/g, '');

            html += `
            <li><a href="${href}" target="_blank">${chapter['chaptername']}</a></li>
            `;
        });

        $('.chapters-ul').html(html);


    }

}