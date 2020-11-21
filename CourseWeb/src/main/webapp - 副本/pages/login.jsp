<%--
  Created by IntelliJ IDEA.
  User: Tanyiqu
  Date: 2020/8/20
  Time: 11:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <%-- 兼容360和IE --%>
    <meta name=”renderer” content=”webkit|ie-comp|ie-stand” />

    <title>登录</title>
    <link rel="short icon" href="../imgs/logo.png">

    <!-- jQuery -->
    <script src="../js/jquery-3.5.1.min.js"></script>

    <!-- bootstrap -->
    <link rel="stylesheet" href="../css/bootstrap.css">
    <script src="../js/bootstrap.js"></script>

    <!-- toastr -->
    <link rel="stylesheet" href="../css/toastr.min.css">
    <script src="../js/toastr.min.js"></script>

    <!-- 自己的css -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/teacher-login.css">

    <!-- 工具类和常量类 -->
    <script src="../js/util.js"></script>
    <script src="../js/interfaces.js"></script>

    <!-- 自己的js -->
    <script src="../js/t-login.js"></script>

</head>

<body>

<!-- 登录页面 -->
<main>

    <!-- 左半部分 -->
    <div class="left">
        <div class="login-way">
            <div class="active" id="userLogin">用户登录</div>
            <div class="inactive" id="adminLogin">管理员登录</div>
        </div>
        <br>

        <form action="${pageContext.request.contextPath}/user/teacher"
              method="POST" class="user">
            <input type="text" name="username" placeholder="工号" value="888888888"><br>
            <input type="password" name="password" placeholder="密码" value="000000"><br>
            <div class="v-code">
                <input type="text" placeholder="验证码">
                <img src="../imgs/code.jpg" alt=""></div>
            <input type="submit" value="登录" class="submit">
        </form>

        <form action="${pageContext.request.contextPath}/user/admin"
              method="POST" class="admin">
            <input type="text" name="username" placeholder="账号" value="wsgly"><br>
            <input type="password" name="password" placeholder="密码" value="000000"><br>
            <div class="v-code">
                <input type="text" placeholder="验证码">
                <img src="../imgs/code.jpg" alt=""></div>
            <input type="submit" value="登录" class="submit">
        </form>

        <div class="verify">
            <span class="signin">新用户注册</span>
            <span class="forget">忘记密码</span>
        </div>

        <div class="privacy-policy">
            登录即表示同意平台《隐私政策》和《用户协议》
        </div>

    </div>


    <!-- 右半部分 -->
    <div class="right">
        <div class="qr-code">
            <img src="../imgs/qr.png" alt="">
            <h4 class="h4">使用微信扫一扫登录微信小程序</h4>
        </div>
    </div>
</main>


</body>
