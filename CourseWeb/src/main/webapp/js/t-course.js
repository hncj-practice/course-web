/**
 * 这里所有代码都写在代码块里面了
 * 后期可以在代码块变成函数
 * 如果忘记了，可以请后面的同学改
 * 每个代码块的功能都有注释
 */

// 入口函数
$(function () {
    loadChapters();

    loadPapers();

    loadEvents_Course();
});


// 加载章节
function loadChapters() {
    let url = CHAPTER_API.FIND;
    let param = {
        courseid: currCid
    };
    let success = (e) => {
        if (e.code === 200) {
            let html = '';
            e.data.forEach((item) => {
                html += `
                <li cpid="{0}">{1}</li>
                `.format(item['chapterid'], item['chaptername']);
            });
            chapters.html(html);
        } else {
            toastr.error(e.message);
        }
    };
    let chapters = $('.ul-zj');
    my_ajax(url, param, success);
}

// 加载试卷
function loadPapers() {
    let url = PAPER_API.FIND;
    let param = {
        courseid: currCid
    };
    let success = (e) => {
        if (e.code === 200) {
            let html = '';
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
            papers.html(html);
        } else {
            toastr.error(e.message);
        }
    };
    let papers = $('.ul-sj');
    my_ajax(url, param, success);
}


function loadEvents_Course() {
    // 点击切换页面
    {
        let zj = $('#zj');
        let sj = $('#sj');
        let ht = $('#ht');
        let zjContain = $('#zjContain');
        let sjContain = $('#sjContain');
        let htContain = $('#htContain');


        // 切换题目页
        zj.click(() => {
            setClass(zj, 'active', 'inactive');
            setClass(sj, 'inactive', 'active');
            setClass(ht, 'inactive', 'active');
            zjContain.show(200);
            sjContain.hide(200);
            htContain.hide(200);
        });

        // 切换试卷页
        sj.click(() => {
            setClass(sj, 'active', 'inactive');
            setClass(zj, 'inactive', 'active');
            setClass(ht, 'inactive', 'active');
            sjContain.show(200);
            zjContain.hide(200);
            htContain.hide(200);
        });

        // 切换话题页
        ht.click(() => {
            setClass(ht, 'active', 'inactive');
            setClass(zj, 'inactive', 'active');
            setClass(sj, 'inactive', 'active');
            htContain.show(200);
            sjContain.hide(200);
            zjContain.hide(200);
        });
    }


    // 自动出卷
    autoPaper();
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

// 显示预览试卷
function previewPaper(obj) {
    $('.random-paper-preview').show(250);
    let xzHtml = '';
    let tkHtml = '';
    let pdHtml = '';
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
            courseid: currCid,
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
                paperid: e['data']['paperid'],
                problemids: problemids
            };
            my_ajax(url2, param2, (e) => {
                if (e.code === 200) {
                    toastr.success('随机组卷成功');
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

