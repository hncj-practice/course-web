
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