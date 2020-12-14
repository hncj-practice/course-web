/**
 * 课程 - 试卷页面
 */


// 入口函数
$(function () {
    // 加载试卷信息
    (async () => {
        await loadPapers();
    })();
});


// 加载试卷
async function loadPapers() {
    let cid = parent.currCourseId;
    let url = PAPER_API.FIND;

    let [err, data] = await awaitWrap(post(url, {
        courseid: cid
    }));

    if (err) {
        toastr.error(err);
    } else {
        let papers = data.data;
        console.log('papers');
        console.log(papers);

        let html = '';

        papers.forEach(paper => {
            html += `
            <div class="paper-item">
                <p class="title">${paper['papername']}</p>
    
                <div class="desc">
                    <p class="start">开始时间：${formatTime(paper['starttime'])}</p>
                    <p class="end">结束时间：${formatTime(paper['endtime'])}</p>
                    <p class="status">考试状态：<span>${getPaperStatus(paper['status'])}</span></p>
                </div>
    
                <div class="option">
                    <button>编辑</button>
                </div>
            </div>
            `;
        });

        $('.papers-list').html(html);

    }
}


function getPaperStatus(status) {
    switch (status) {
        case 0:
            return '待发布';
        case 1:
            return '已发布';
    }
}