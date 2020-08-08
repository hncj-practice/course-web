function classChange(dom, class1, class2) {


    if (dom.hasClass(class1)) {
        dom.removeClass(class1);
        dom.addClass(class2);
    } else {
        dom.removeClass(class2);
        dom.addClass(class1);
    }

}


function setClass(dom, class1, class2) {
    if (dom.hasClass(class1)) {
        return;
    } else {
        if (dom.hasClass(class2)) {
            dom.removeClass(class2);
        }
        dom.addClass(class1);
    }
}