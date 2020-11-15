/**
 * 这里所有代码都写在代码块里面了
 * 后期可以在代码块变成函数
 * 如果忘记了，可以请后面的同学改
 * 每个代码块的功能都有注释
 */

// 入口函数
$(function () {
    // loadChapterQuestions();

    // loadPapers();

    loadEvents_Course();
});


// 加载章节试题
function loadChapterQuestions() {
    let url = CHAPTER_API.FIND;
    let param = {
        courseid: currCourseId
    };
    let success = (e) => {
        if (e.code === 200) {
            let html = '';
            e.data.forEach((item) => {
                html += `
                <li cpid="{0}">{1}</li>
                `.format(item['chapterid'], item['chaptername']);
            });
            // chapters.html(html);
        } else {
            toastr.error(e.message);
        }
    };
    // let chapters = $('.chapters-ul');
    my_ajax(url, param, success);
}

// 加载试卷
function loadPapers() {
    let url = PAPER_API.FIND;
    let param = {
        courseid: currCourseId
    };
    let success = (e) => {
        let papers = $('.papers-ul');
        let html = '';
        if (e.code === 200) {
            html = '';
            e.data.forEach((item) => {
                html += `
                <li>
                    <img paperid="{0}" class="delete-paper" src="../imgs/delete.png" alt="">
                    <img paperid="{0}" class="update-paper" src="../imgs/update.png" alt="">
                    <p>{1}</p>
                    <p>开始：{2}</p>
                    <p>结束：{3}</p>
                    <p>状态：{4}</p>
                </li>
                `.format(item['paperid'], item['papername'], item['starttime'], item['endtime'], item['status']);
            });
        } else {
            // 没有一张试卷
            html = `
            <li>
                <h3>暂无试卷，请添加！</h3>
            </li>
            `;
        }
        papers.html(html);
        loadPaperEvents();
    };

    my_ajax(url, param, success);
}

// 加载试卷相关点击事件
function loadPaperEvents() {
    // 点击删除试卷
    // noinspection JSJQueryEfficiency
    $('.delete-paper').off('click');
    $('.delete-paper').click((e) => {
        let paperid = $(e.target).attr('paperid');
        console.log('删试卷：' + paperid);
        // 弹出警告对话框
        myBootstrapModel('警告', '确定删除此试卷', '确定', '取消', () => {
            let url = PAPER_API.DELETE;
            let param = {
                user: teacherId,
                pwd: teacherPassword,
                paperid: paperid
            };
            let success = (e) => {
                if (e.code === 200) {
                    toastr.success(e.message);
                    // 删除成功刷新列表
                    loadPapers();
                } else {
                    toastr.error(e.message);
                }
            };
            my_ajax(url, param, success);
        });
    });
}

// 加载页面原有元素的事件，不加载js生成的元素的事件
function loadEvents_Course() {
    // 点击切换页面
    {
        let chapterManage = $('#chapterManage');
        let paperManage = $('#paperManage');
        let topicManage = $('#topicManage');
        let chapterContain = $('#chapterContain');
        let paperContain = $('#paperContain');
        let topicContain = $('#topicContain');

        // 切换题目页
        chapterManage.click(() => {
            setClass(chapterManage, 'active', 'inactive');
            setClass(paperManage, 'inactive', 'active');
            setClass(topicManage, 'inactive', 'active');
            chapterContain.show(200);
            paperContain.hide(200);
            topicContain.hide(200);
        });

        // 切换试卷页
        paperManage.click(() => {
            setClass(paperManage, 'active', 'inactive');
            setClass(chapterManage, 'inactive', 'active');
            setClass(topicManage, 'inactive', 'active');
            paperContain.show(200);
            chapterContain.hide(200);
            topicContain.hide(200);
        });

        // 切换话题页
        topicManage.click(() => {
            setClass(topicManage, 'active', 'inactive');
            setClass(chapterManage, 'inactive', 'active');
            setClass(paperManage, 'inactive', 'active');
            topicContain.show(200);
            paperContain.hide(200);
            chapterContain.hide(200);
        });
    }

    // 自动出卷
    autoPaper();

    // 归档课程
    loadEventArchive();
}

// 自动出卷/随机组卷
function autoPaper() {
    let randomPaper = $('#randomPaper');
    randomPaper.click(() => {
        $('.random-paper').show(250);
    });

    // 选好设置后点击确定
    $('.ensure-random-paper').click(() => {
        let url = PAPER_API.RANDOM_PAPER;
        let param = {
            user: teacherId,
            pwd: teacherPassword,
            chapterid: ['1'],
            type: 2,
            choice: 2,
            fill: 0,
            judge: 0
        };
        // 成功回调
        let success = (e) => {
            if (e.code === 200) {
                toastr.success(e.message);
                // 显示预览试卷窗口
                previewPaper(e.data);
            } else {
                toastr.error(e.message);
            }
        };
        my_ajax(url, param, success);
    });
}

// 归档课程
function loadEventArchive() {
    $('#archive').off('click');
    $('#archive').click(() => {
        console.log('归档课程：' + currCourseId);
    });
}

// 显示预览试卷
function previewPaper(obj) {
    $('.random-paper-preview').show(250);
    let xzHtml = '';
    // let tkHtml = '';
    // let pdHtml = '';
    // 根据传入的数组，生成元素
    obj.forEach((item) => {
        // 选择题
        if (item['ptype'] === 1) {
            xzHtml += `
            <p>{0}</p>
            `.format(item['question']);
        }
        // 填空题

        // 判断题
    });
    $('#previewXZ').html(xzHtml);

    // 点击确定添加此试卷
    // 1.生成试卷
    // 2.给生成的试卷添加试题
    $('.ensure-random-paper-new').click(() => {
        // 添加进试卷
        let url = PAPER_API.NEW;
        let param = {
            user: teacherId,
            pwd: teacherPassword,
            courseid: currCourseId,
            papername: '随机卷 - 未命名',
            choicepoints: 2,
            fillpoints: 2,
            judgepoints: 1,
            starttime: '2020-08-31 14:30:00',
            endtime: '2020-08-31 16:30:00',
            status: 1
        };
        // 试卷生成成功的回调
        let success = (e) => {
            // 试卷添加成功，插入题目
            // 构造题目id数组
            let problemids = [];
            obj.forEach((item) => {
                    problemids.push(item['pid']);
                }
            );
            toastr.info('生成试卷：随机卷 - 未命名');
            let url2 = PAPER_API.ADD;
            let param2 = {
                user: teacherId,
                pwd: teacherPassword,
                paperid: e['data']['paperid'],
                problemids: problemids
            };
            my_ajax(url2, param2, (e) => {
                if (e.code === 200) {
                    toastr.success('随机组卷成功');
                    loadPapers();
                } else {
                    toastr.error(e.message);
                }
                $('.random-paper-preview').hide(250);
                $('.random-paper').hide(250);
            });
        };

        my_ajax(url, param, success);
    });

}

