// 入口函数
$(function () {

    formatChoice('以下关于线性分类器说法不正确的（ ）$A:线性分类器的一种直观的最优决策边界为最大间隔边界$B:线性可分的情形下，线性分类器的决策边界可以是多样的$C:线性分类器打分越高的样例越离决策边界越近，具有更高的分类置信度$D:训练好的SVM模型直接给出样例的列别标签');
    loadQuestions();

    // 加载事件
    // loadEvents();
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
    switch (type) {
        // 选择题
        case 1:
            list = $('#xzList');
            my_ajax(url, param, (e) => {
                if (e.code === 200) {
                    let html = '';
                    e.data.forEach((item) => {
                        // 格式化题干
                        let q = formatChoice(item['question']);
                        // 动态生成选项
                        let optHtml = '';
                        q['opts'].forEach((opt) => {
                            optHtml += '<p>{0}</p>'.format(opt);
                        });
                        // 添加题目
                        html += `
                        <div questionid="{0}" class="xz">
                            <p>{1}</p>
                            {2}
                        </div>
                        `.format(item['pid'], q['question'], optHtml);
                    });
                    list.html(html);
                    if (success) {
                        success();
                    }
                } else {
                    toastr.error(e.message);
                }
            });
            break;
        case 2:
            list = $('#tkList');
            break;
        case 3:
            list = $('#pdList');
            break;
    }

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


// 格式化选择题
function formatChoice(questionStr) {
    // 以下关于线性分类器说法不正确的（ ）$A:线性分类器的一种直观的最优决策边界为最大间隔边界$B:线性可分的情形下，线性分类器的决策边界可以是多样的$C:线性分类器打分越高的样例越离决策边界越近，具有更高的分类置信度$D:训练好的SVM模型直接给出样例的列别标签
    let questions = questionStr.split('$');
    let q = questions[0];
    let opts = [];
    for (let i = 1; i < questions.length; i++) {
        opts.push(questions[i])
    }
    let question = {
        question: q,
        opts: opts
    };
    // console.log(question);
    return question;
}