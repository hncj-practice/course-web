/**
 * 将dom的class2 替换成 class1
 * @param {*} dom
 * @param {*} class1
 * @param {*} class2
 */
function setClass(dom, class1, class2) {
    if (dom.hasClass(class1)) {

    } else {
        if (dom.hasClass(class2)) {
            dom.removeClass(class2);
        }
        dom.addClass(class1);
    }
}


/**
 * 去掉$警告
 * @param param
 * @returns {jQuery|HTMLElement}
 */
function $(param) {
    // noinspection JSUnresolvedFunction
    return jQuery(param);
}

/**
 * 字符串格式化辅助
 */
String.prototype.format = function (args) {
    let result = this;
    if (arguments.length > 0) {
        if (arguments.length === 1 && typeof (args) == "object") {
            for (let key in args) {
                if (args.key !== undefined) {
                    let reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args.key);
                }
            }
        } else {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    let reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

/**
 * 判断字符串是否为空
 */
function isEmpty(obj) {
    return typeof obj == "undefined" || obj == null || obj.trim() === "";
}

/**
 * 封装bootstrap的模态框
 * 使用页面必须包含此div
 <!-- 模态框 -->
 <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
 <div class="modal-dialog">
 <div class="modal-content">
 <div class="modal-header">
 <button type="button" class="close" data-dismiss="modal"
 aria-hidden="true">×
 </button>
 <h4 class="modal-title" id="myModalLabel">
 模态框标题
 </h4>
 </div>
 <div class="modal-body" id="myModelBody">
 模态框内容
 </div>
 <div class="modal-footer">
 <button id="modelCancel" type="button" class="btn btn-default" data-dismiss="modal" >
 取消
 </button>
 <button id="modelConfirm" type="button" class="btn btn-primary">
 确定
 </button>
 </div>
 </div>
 </div>
 </div>
 * @param title 标题
 * @param body 内容
 * @param positive 积极按钮
 * @param negative 消极按钮
 * @param onPositive 积极按钮事件
 */
function myBootstrapModel(title, body, positive, negative, onPositive) {

    // 设置文字内容
    $('#myModalLabel').html(title);
    $('#myModelBody').html(body);
    $('#modelConfirm').html(positive);
    $('#modelCancel').html(negative);


    // 点击确定
    $('#modelConfirm').off('click');
    $('#modelConfirm').click(() => {
        onPositive();
        $('#myModal').modal('hide')
    });

    // 弹出
    $('#myModal').modal();

}