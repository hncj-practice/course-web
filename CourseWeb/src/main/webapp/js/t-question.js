// 入口函数
$(function () {
    // 加载题目
    loadQuestions();

    // 加载事件
    loadEvents();
});


/**
 * 加载题目
 * @param type 类型 [1:选择，2:填空，3:判断]，不填则请求所有类型的题目
 * @param success 加载成功的回调
 */
function loadQuestions(type, success) {
    let url = QUESTION_API.FIND;
    let param = {
        chapterid: currCpid,
        type: type
    };
    let list;
    // 请求所有类型
    if (!type) {
        loadQuestions(1);
        loadQuestions(2);
        loadQuestions(3, () => {
            toastr.success('刷新成功')
        });
        return;
    }
    my_ajax(url, param, (e) => {
        let questionList = e.data;
        if (e.code === 200) {
            switch (type) {
                // 填空
                case 2:
                    list = $('#tkList');
                    break;
                // 判断
                case 3:
                    list = $('#pdList');
                    break;
                // 选择
                case 1:
                default:
                    let html = '';
                    list = $('#xzList');
                    questionList.forEach((item) => {
                        // 格式化题干
                        let question = formatQuestion(item['question'], item['panswer'], 1);
                        // 动态生成选项
                        let optHtml = '';
                        question['opts'].forEach((opt) => {
                            optHtml += '<p>{0}</p>'.format(opt);
                        });
                        // 添加题目
                        html += `
                        <div questionid="{0}" class="xz">
                            <p>{1}</p>
                            {2}
                            <p>答案：{3}</p>
                        </div>
                        `.format(item['pid'], question['question'], optHtml, question['answer']);
                    });
                    list.html(html);
                    break;
            }
            if (success) {
                success();
            }
        } else {
            toastr.error(e.message);
        }
    });

    // my_ajax(url, param, (e) => {
    //     if (e.code === 200) {
    //         switch (type) {
    //             // 填空
    //             case 2:
    //                 list = $('#tkList');
    //
    //                 break;
    //             // 判断
    //             case 3:
    //                 list = $('#pdList');
    //                 break;
    //             // 选择
    //             case 1:
    //             default:
    //                 let html = '';
    //                 list = $('#xzList');
    //                 e.data.forEach((item) => {
    //                     // 格式化题干
    //                     let q = formatChoice(item['question']);
    //                     // 动态生成选项
    //                     let optHtml = '';
    //                     q['opts'].forEach((opt) => {
    //                         optHtml += '<p>{0}</p>'.format(opt);
    //                     });
    //                     // 添加题目
    //                     html += `
    //                     <div questionid="{0}" class="xz">
    //                         <p>{1}</p>
    //                         {2}
    //                         <p>答案：{3}</p>
    //                     </div>
    //                     `.format(item['pid'], q['question'], optHtml, item['panswer']);
    //                 });
    //                 list.html(html);
    //                 break;
    //         }
    //         if (success) {
    //             success();
    //         }
    //     } else {
    //         toastr.error(e.message);
    //     }
    // });
}

// 加载事件
function loadEvents() {

    // 导入题目
    {
        // 下载导入模板
        $('#downloadTemplate').attr('href', STATIC.QUESTION_TEMPLATE);
        // 按钮的点击事件
        $('#importQuestion').off('click');
        $('#importQuestion').click(() => {
            return $('#importQuestionInput').click();
        });
        // input file的change事件
        $('#importQuestionInput').off('change');
        $('#importQuestionInput').change((e) => {
            let files = e.target.files;
            // 解析excel文件
            resolveXlsx(false, files, (list) => {
                list.forEach((item, index) => {
                    // console.log(item);
                    // 请求添加题目API
                    let param = {
                        chapterid: currCpid,
                        ptype: item['qtype'],
                        question: item['question'],
                        panswer: item['answer']
                    };
                    // 最后一次成功回调后刷新页面
                    if (index === list.length - 1) {
                        addQuestion(param, loadQuestions);
                    } else {
                        addQuestion(param);
                    }
                });
            });
        });
    }
}

// 单独添加题目
function addQuestion(param, success) {
    let url = QUESTION_API.ADD;
    param['user'] = teacherId;
    param['pwd'] = teacherPassword;
    my_ajax(url, param, (e) => {
        if (e.code === 200) {
            if (success) {
                success();
            }
        } else {
            toastr.error(e.message);
        }
    });
}


/**
 * 格式化题目
 * @param questionStr   题干字符串
 * @param answerStr     答案字符串
 * @param type          题目类型
 */
function formatQuestion(questionStr, answerStr, type) {
    switch (type) {
        // 填空题
        case 2:
            break;
        // 判断题
        case 3:
            break;
        // 选择题
        case 1:
        default:
            let questions = questionStr.split('$');
            let q = questions[0];
            let opts = [];
            for (let i = 1; i < questions.length; i++) {
                opts.push(questions[i])
            }
            return {
                question: q,
                opts: opts,
                answer: answerStr
            };
    }
}