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

    let chapters = $('.ul-zj');
    // noinspection JSUnresolvedVariable
    jQuery.ajax({
        type: "POST",
        url: url,
        data: param,
        traditional: true,
        timeout: 5000,
        success: (e) => {
            if (e.code === 200) {
                let html = '';
                e.data.forEach((item) => {
                    html += `<li cpid="{0}">{1}</li>`.format(item['chapterid'], item['chaptername']);
                });
                chapters.html(html);
            } else {
                toastr.error(e.message);
            }
        },
        error: () => {
            toastr.error('服务器异常');
        }
    });
}

// 加载试卷
function loadPapers() {
    let url = PAPER_API.FIND;
    let param = {
        courseid: currCid
    };
    let papers = $('.ul-sj');
    // noinspection JSUnresolvedVariable
    jQuery.ajax({
        type: "POST",
        url: url,
        data: param,
        traditional: true,
        timeout: 5000,
        success: (e) => {
            if (e.code === 200) {
                let html = '';
                e.data.forEach((item) => {
                    html += `
                    <li>
                        <img paperid="{0}" class="delete-paper" src="../imgs/delete.png" alt="">
                        <img paperid="{0}" class="update-paper" src="../imgs/update.png" alt="">
                        <p>{1}试卷名</p>
                        <p>开始：{2}</p>
                        <p>结束：{3}</p>
                        <p>状态：{4}</p>
                    </li>        
                    `.format(item['paperid'], item['paperid'], item['starttime'], item['endtime'], item['status']);
                });
                papers.html(html);
            } else {
                toastr.error(e.message);
            }
        },
        error: () => {
            toastr.error('服务器异常');
        }
    });
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


    // 随机组卷
    {
        let randomPaper = $('#randomPaper');
        randomPaper.click(() => {
            $('.random-paper').show(250);
        });


        $('.ensure-random-paper').click(() => {
            console.log('确定随机组卷');
            let url = PAPER_API.RANDOM_PAPER;
            let param = {
                chapterid: ['1'],
                type: 2,
                choice: 2,
                fill: 0,
                judge: 0
            };
            // noinspection JSUnresolvedVariable
            jQuery.ajax({
                type: "POST",
                url: url,
                data: param,
                traditional: true,
                timeout: 5000,
                success: (e) => {
                    if (e.code === 200) {
                        toastr.success(e.message);
                        
                    } else {
                        toastr.error(e.message);
                    }
                },
                error: () => {
                    toastr.error('服务器异常');
                }
            });
        });
    }
}

function add2Paper() {

}

