/**
 * 教师 - 课程 - 题目页面
 */


// 入口函数
$(function () {
    // 检查登录
    checkLogin();

    // 加载题目
    loadQuestions();

    // 加载事件
    loadEvents();
});


// 检查登录
function checkLogin() {
    console.log('检查更新');
    console.log(teacherId);
    console.log(teacherPassword);
    console.log(currCpid);
    let sign = getQueryString('sign');
    if (sign !== md5(localStorage['course-web-curr-teacher-username'] + localStorage['course-web-curr-teacher-password'])) {
        window.location.href = 'user-login.html';
    }
    // 更改头像和章节名
    $('#headAvatar').attr('src', localStorage['course-web-curr-teacher-avatar']);
    $('.chapterName').text(getQuery('chaptername'));
    $('#tno').text(localStorage['course-web-curr-teacher-username']);
}



/**
 * 加载题目
 * @param type 类型 [1:选择，2:填空，3:判断]，不填则请求所有类型的题目
 * @param success 加载成功的回调
 */
function loadQuestions(type, success) {
    let url = API.QUESTION_API.FIND;
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
        let html = '';
        if (e.code === 200) {
            switch (type) {
                // 填空
                case 2:
                    let num_tk = 1;
                    list = $('#tkList');
                    html = '';
                    questionList.forEach((item) => {
                        let question = formatQuestion(item['question'], item['panswer'], 2);
                        html += `
                        <div questionid="{0}" class="tk-item">
                            <p class="question-main">{1}</p>
                            <p class="question-answer">答案：{2}</p>
                        </div>                  
                        `.format(item['pid'], num_tk + '、' + question['question'], question['answer']);
                        num_tk++;
                    });
                    list.html(html);
                    break;
                // 判断
                case 3:
                    let num_pd = 1;
                    list = $('#pdList');
                    html = '';
                    questionList.forEach((item) => {
                        let question = formatQuestion(item['question'], item['panswer'], 3);
                        html += `
                        <div questionid="{0}" class="pd-item">
                            <p class="question-main">{1}</p>
                            <p class="question-answer">答案：{2}</p>
                        </div>
                        `.format(item['pid'], num_pd + '、' + question['question'], question['answer']);
                        num_pd++;
                    });
                    list.html(html);
                    break;
                // 选择
                case 1:
                default:
                    let num_xz = 1;
                    list = $('#xzList');
                    html = '';
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
                        <div questionid="{0}" class="xz-item">
                            <p class="question-main">{1}</p>
                            <div class="question-opts">
                            {2}
                            </div>
                            <p class="question-answer">答案：{3}</p>
                        </div>
                        `.format(item['pid'], num_xz + '、' + question['question'], optHtml, question['answer']);
                        num_xz++;
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
}

// 加载事件
function loadEvents() {

    // 单独添加题目
    {
        $('#addQuestion').off('click');
        $('#addQuestion').click(() => {
            $('.add-question-div').show(250);
        });

        // 关闭窗口
        $('#closeAddQuestion').off('click');
        $('#closeAddQuestion').click(() => {
            $('.add-question-div').hide(250);
        });

        // 切换页面
        {
            let btnAddXZ = $('#btnAddXZ');
            let btnAddTK = $('#btnAddTK');
            let btnAddPD = $('#btnAddPD');
            let addXZ = $('#addXZ');
            let addTK = $('#addTK');
            let addPD = $('#addPD');
            btnAddXZ.click(() => {
                // 显示
                addXZ.show();
                btnAddXZ.addClass('active');
                addTK.hide();
                btnAddTK.removeClass('active');
                addPD.hide();
                btnAddPD.removeClass('active');
            });
            btnAddTK.click(() => {
                // 显示
                addXZ.hide();
                btnAddXZ.removeClass('active');
                addTK.show();
                btnAddTK.addClass('active');
                addPD.hide();
                btnAddPD.removeClass('active');
            });
            btnAddPD.click(() => {
                // 显示
                addXZ.hide();
                btnAddXZ.removeClass('active');
                addTK.hide();
                btnAddTK.removeClass('active');
                addPD.show();
                btnAddPD.addClass('active');
            });
        }

        // 点击添加按钮
        $('#btbAddTM').click(() => {
            // 判断添加的题型，编号根据接口文档
            let type;
            if ($('#btnAddXZ').hasClass('active')) {
                type = 1;
            } else if ($('#btnAddTK').hasClass('active')) {
                type = 2;
            } else {
                type = 3;
            }
            let question;
            let answer;
            switch (type) {
                case 3:
                    console.log('添加判断题');
                    question = $('#questionPD').val();
                    if (question.trim() === '') {
                        toastr.error('请输入题目内容');
                        break;
                    }
                    answer = $('#answerPD').val();
                    console.log(question);
                    console.log(answer);
                    // 添加题目
                    addQuestion({
                        chapterid: currCpid,
                        ptype: type,
                        question: question,
                        panswer: answer
                    }, () => {
                        // 清空输入
                        $('#questionPD').val('');
                        toastr.success('添加成功，刷新后显示');
                    });
                    break;
                case 2:
                    console.log('添加填空题');
                    question = $('#questionTK').val();
                    answer = $('#answerTK').val();
                    if (question.trim() === '') {
                        toastr.error('请输入题目内容');
                        break;
                    }
                    if (answer.trim() === '') {
                        toastr.error('请输入答案');
                        break;
                    }
                    addQuestion({
                        chapterid: currCpid,
                        ptype: type,
                        question: question,
                        panswer: answer
                    }, () => {
                        // 清空输入
                        $('#questionTK').val('');
                        $('#answerTK').val('');
                        toastr.success('添加成功，刷新后显示');
                    });
                    break;
                case 1:
                default: {
                    console.log('添加选择题');
                    question = $('#questionXZ').val();
                    answer = $('#answerXZ').val();
                    if (question.trim() === '') {
                        toastr.error('没有题目内容');
                        break;
                    }
                    // 获取4个选项的值
                    let opts = [];
                    // 循环ABCD
                    let arr = ['A', 'B', 'C', 'D'];
                    try {
                        arr.forEach(item => {

                            let id = '#opt' + item;
                            let value = $(id).val();
                            if (value.trim() === "") {
                                if (item === 'A') {
                                    throw new Error('请输入选项A');
                                }
                                if (item === 'B') {
                                    throw new Error('请输入选项B');
                                }
                                throw new Error('空');
                            }
                            opts.push(item + '、' + value);
                        });
                    } catch (e) {
                        if (e.message !== '空') {
                            toastr.error(e.message);
                            break;
                        }
                    }
                    question += '$' + opts.join('$');
                    console.log(question);
                    console.log(answer);
                    // 添加题目
                    addQuestion({
                        chapterid: currCpid,
                        ptype: type,
                        question: question,
                        panswer: answer
                    }, () => {
                        // 清空输入
                        $('#questionXZ').val('');
                        $('#optA').val('');
                        $('#optB').val('');
                        $('#optC').val('');
                        $('#optD').val('');
                        toastr.success('添加成功，刷新后显示');
                    });
                    break
                }

            }

        });
    }

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
                try {
                    list.forEach((item, index) => {
                        console.log(item);
                        // 判断模板是否正确
                        if (!(item['answer'] && item['qtype'] && item['question'])) {
                            throw new Error('请使用正确的模板！');
                        }
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
                } catch (e) {
                    toastr.error(e.message);
                }

            });
        });
    }
}

// 单独添加题目
function addQuestion(param, success) {
    let url = API.QUESTION_API.ADD;
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
            let answer = answerStr.replace(/\$/g, '、');
            return {
                question: questionStr,
                answer: answer
            };
        // 判断题
        case 3:
            return {
                question: questionStr,
                answer: answerStr
            };
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