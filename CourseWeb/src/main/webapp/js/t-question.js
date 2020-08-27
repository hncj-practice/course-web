// 入口函数
$(function () {
    loadXZQuestions();
});


// 加载选择题
function loadXZQuestions() {
    let url = QUESTION_API.FIND;
    let param = {
        chapterid: currCpid,
        type: 1
    };

    let xz = $('#xzList');
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
                    <div questionid="{0}" class="xz">
                        <p>{1}</p>
                    </div>
                    `.format(item['pid'], item['question']);
                });
                xz.html(html);
            } else {
                toastr.error(e.message);
            }
        },
        error: () => {
            toastr.error('服务器异常');
        }
    });
}