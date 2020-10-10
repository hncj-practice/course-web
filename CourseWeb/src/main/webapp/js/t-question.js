// 入口函数
$(function () {
    loadQuestions();
});


/**
 * 加载题目
 * @param type 类型 [1:选择，2:填空，3:判断]，不填则请求所有类型的题目
 */
function loadQuestions(type) {
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
        loadQuestions(3);
        return;
    }
    switch (type) {
        case 1:
            list = $('#xzList');
            break;
        case 2:
            list = $('#tkList');
            break;
        case 3:
            list = $('#pdList');
            break;
        default:
            list = $('#xzList');
    }
    my_ajax(url, param, (e) => {
        if (e.code === 200) {
            let html = '';
            e.data.forEach((item) => {
                html += `
                    <div questionid="{0}" class="xz">
                        <p>{1}</p>
                    </div>
                    `.format(item['pid'], item['question']);
            });
            list.html(html);
        } else {
            toastr.error(e.message);
        }
    });
}
