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
 * @param obj 字符串
 * @returns {boolean}
 */
function isEmpty(obj) {
    return typeof obj == "undefined" || obj == null || obj.trim() === "";
}


/**
 * 封装bootstrap的模态框
 * @param title 标题
 * @param body 内容
 * @param positive 积极按钮
 * @param negative 消极按钮
 * @param onPositive 积极按钮事件
 */
function myBootstrapModel(title, body, positive, negative, onPositive) {
    /*
    使用页面必须包含此div
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
    */
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

/**
 * 根据jquery的ajax封装常用的ajax
 * @param url url
 * @param param 参数
 * @param success 成功回调
 * @param error 失败
 */
function my_ajax(url, param, success, error) {
    // 判断是否传入success
    if (!success) {
        success = (e) => {
            toastr.success(e.message);
        };
    }
    // 判断是否传入error
    if (!error) {
        error = () => {
            toastr.error('服务器异常');
        }
    }
    // noinspection JSUnresolvedVariable
    jQuery.ajax({
        type: "POST",
        url: url,
        data: param,
        traditional: true,
        timeout: 5000,
        success: success,
        error: error
    });

}


/**
 * 解析excel文件
 * @param rABS 是否用二进制读取
 * @param files file列表
 * @param callback 回调
 */
function resolveXlsx(rABS, files, callback) {
    let wb;
    let f = files[0];
    let reader = new FileReader();
    // load回调函数
    reader.onload = (e) => {
        let data = e.target.result;
        if (rABS) {
            wb = XLSX.read(btoa(fixData(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        let list = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        callback(list);
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}


/**
 * 文件流转BinaryString
 * @param data
 * @returns {string}
 */
function fixData(data) {
    let o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}