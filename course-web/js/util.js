/**
 * 此文件为js工具类
 */


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
 * 判断str是不是字符串
 * @param str
 * @returns {boolean|boolean}
 */
function isString(str) {
    return (typeof str == 'string') && str.constructor === String;
}


/**
 * 判断字符串是否为空
 * @param obj 字符串
 * @returns {boolean}
 */
function isEmpty(obj) {
    return typeof obj == "undefined" || obj == null || obj.trim() === "";
}


/**
 * 检查字符串是否有空串、undefined、空白串、null等
 * 如果有则返回true
 * @param strings
 */
function testFailed(...strings) {
    // 遍历strings
    for (let i = 0; i < strings.length; i++) {
        if (isEmpty(strings[i])) {
            return true;
        }
    }
    return false;
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
 * 弹出警告确认框
 * @param body 警告内容
 * @param onPositive 点击确定的回调
 * @param title 标题
 * @param positive 确认的按钮名称
 * @param negative 取消的按钮名称
 */
function showWarning(body, onPositive, title = '警告', positive = '确定', negative = '取消') {
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
 * promise的ajax
 * @param url
 * @param param
 * @param timeout
 * @returns {Promise}
 */
function post(url, param, timeout = 5000) {
    return new Promise((resolve, reject) => {
        jQuery.ajax({
            url: url,
            type: 'POST',
            data: param,
            traditional: true,
            timeout: timeout,
            success: e => {
                if (e.code === 200) {
                    resolve(e);
                } else {
                    if (e.message) {
                        reject(e.message);
                    } else {
                        reject(ErrorCode['10001']);
                    }
                }
            },
            error: e => {
                console.log(e);
                reject(ErrorCode['10003']);
            }
        });
    });
}


/**
 * await错误处理函数
 * @param promise
 * @returns {Promise}
 */
const awaitWrap = (promise) => {
    return promise
        .then(data => [null, data])
        .catch(err => [err, null]);
};


/**
 * 通用的处理awaitWrap的结果
 * 成功显示一下data的message，然后执行回调
 * 失败显示err，若err不是字符串则显示 10001错误
 * @param err
 * @param data
 * @param success
 */
async function process([err, data], success) {
    // 成功
    if (data) {
        toastr.success(data.message);
        if (success) {
            await success();
        }
    }
    // 失败
    else {
        if (typeof (err) === "string") {
            toastr.error(err);
        } else {
            toastr.error(ErrorCode["10001"]);
        }
    }
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


/**
 * Tab类
 */
class IframeTab {
    /**
     * 构造器
     * @param {string} selector 被点击元素的选择器
     * @param {string} page 绑定的页面
     */
    constructor(selector, page) {
        this.selector = selector;
        this.page = page;
        this.btn = $(this.selector);
    }

    // 设置激活状态
    activate = () => {
        this.btn.addClass('active');
    };

    // 取消激活状态
    deactivate = () => {
        this.btn.removeClass('active');
    };
}


/**
 * 切换iframe页面
 * @param {string} frame iframe的选择器
 * @param {IframeTab[]} tabs 页面数组
 */
function switchIFrameTab(frame, tabs) {
    /**
     * 步骤：当按钮被点击时：
     * （1）所有按钮都取消激活状态
     * （2）被点击的按钮设置激活状态
     * （3）切换到被点击的tab的页面
     */
    const n = tabs.length;
    for (let i = 0; i < n; i++) {
        tabs[i].btn.click(() => {
            // 所有按钮取消激活
            for (let j = 0; j < n; j++) {
                tabs[j].deactivate();
            }
            // 被点击的按钮激活
            tabs[i].activate();
            // 切换页面
            $(frame).attr('src', tabs[i].page);
        });
    }
}


/**
 * Div的Tab
 */
class DivTab {
    /**
     * 构造器
     * @param btnSelector 按钮的选择器
     * @param divSelector 按钮绑定的div的选择器
     */
    constructor(btnSelector, divSelector) {
        this.btn = $(btnSelector);
        this.target = $(divSelector);
    }

    // 设置激活状态
    activate(delay) {
        this.btn.addClass('active');
        this.target.show(delay);
    }

    // 取消激活状态
    deactivate(delay) {
        this.btn.removeClass('active');
        this.target.hide(delay);
    }
}


/**
 * 切换div的标签
 * @param {DivTab[]} tabs
 * @param delay
 */
function switchDivTab(tabs, delay = 0) {
    const n = tabs.length;
    for (let i = 0; i < n; i++) {
        tabs[i].btn.click(() => {
            for (let j = 0; j < n; j++) {
                tabs[j].deactivate(delay);
            }
            tabs[i].activate(delay);
        });
    }
}