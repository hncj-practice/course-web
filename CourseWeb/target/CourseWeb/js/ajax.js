/**
 * 封装ajax的get请求方法
 * @param {String} url 请求url
 * @param {Object} param 请求参数
 * @param {Function} success 
 * @param {Function} error 
 * @param {Int32Array} timeout 
 */
function ajax_get(url, param, success, error, timeout) {
    // 1.创建一个异步对象
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 6.超时处理
    let timer;
    if (!timeout) {
        // 默认超时5秒
        timeout = 5000;
    }
    timer = setInterval(function () {
        console.log('请求已超时中断...');
        xmlhttp.abort();
        clearInterval(timer);
    }, timeout);

    // 2.监听状态变化
    xmlhttp.onreadystatechange = function (e1) {
        if (xmlhttp.readyState === 4) {
            // 清理定时器
            clearInterval(timer);
            // 3.处理返回的结果
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                if (success) {
                    success(xmlhttp);
                }
            } else {
                if (error) {
                    error(xmlhttp);
                }
            }
        }
    }

    // 4.设置请求方式和地址
    url = url + '?' + obj2str(param);
    xmlhttp.open("GET", url, true);

    // 5.发送请求
    xmlhttp.send();
}


/**
 * 封装ajax的post请求方法
 * @param {String} url 
 * @param {Object} param 
 * @param {Function} success 
 * @param {Function} error 
 * @param {Int32Array} timeout 
 */
function ajax_post(url, param, success, error, timeout) {
    // 1.创建一个异步对象
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 6.超时处理
    let timer;
    if (!timeout) {
        // 默认超时5秒
        timeout = 5000;
    }
    timer = setInterval(function () {
        console.log('请求已超时中断...');
        xmlhttp.abort();
        clearInterval(timer);
    }, timeout);

    // 2.监听状态变化
    xmlhttp.onreadystatechange = function (e1) {
        if (xmlhttp.readyState === 4) {
            // 清理定时器
            clearInterval(timer);
            // 3.处理返回的结果
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                if (success) {
                    success(xmlhttp);
                }
            } else {
                if (error) {
                    error(xmlhttp);
                }
            }
        }
    }

    // 4.设置请求方式和地址
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 5.发送请求
    xmlhttp.send(obj2str(param));
}



/**
 * 将参数对象转换为 key=value&key=value 的格式
 * 处理中文乱码
 * @param {object} obj 
 */
function obj2str(obj) {
    obj.time_stamp__ = new Date().getTime();
    var res = [];
    for (var key in obj) {
        res.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return res.join('&');
}