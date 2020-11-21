<%--
  Created by IntelliJ IDEA.
  User: Tanyiqu
  Date: 2020/8/30
  Time: 10:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课程助手 - 教师</title>
    <script src="../js/util.js"></script>
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
    <link rel="stylesheet" href="../css/teacher-index.css">

    <!-- 工具类和常量类 -->
    <script src="../js/util.js"></script>
    <script src="../js/interfaces.js"></script>

    <!-- 自己的js -->
    <script src="../js/t-index.js"></script>

    <!-- 页面可能用到的js代码 -->
    <script>
        let teacherId = '${sessionScope.teacher.tno}';
        let allCourses = [];
    </script>

</head>

<body>

<header>

    <img src="../imgs/logo.png" alt="">
    <h2>网络课程助手（logo暂定）</h2>

    <div class="account">
        <span id="tno">${sessionScope.teacher.tno}</span>
        <%--        <span id="tno">888888888</span>--%>
        <img id="headAvatar" src="${sessionScope.teacher.avatar}" alt="">

    </div>
</header>

<div class="content-top">
    <div class="middle">
        <div class="avatar">
            <img src="${sessionScope.teacher.avatar}" alt="">
        </div>

        <div class="hello">
            <h3>${sessionScope.teacher.name}，上午好！</h3>
            <h4>就在线学习而言，重要的不是你花了多少钱，而是你投入了多少时间和精力。</h4>
        </div>
    </div>

    <div class="manage"></div>
</div>

<div class="toolbar">
    <div class="item active">
        <h3>课程</h3>
    </div>

    <div class="item">
        <h3>已完结</h3>
    </div>

    <div class="search-bar">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input class="search-courses" type="text" placeholder="搜索我的课程">
        <i></i>
    </div>
</div>

<div class="order">
    <span class="active">按创建时间排序</span>
    <span>按名字排序</span>
</div>

<div class="loading" style="text-align: center">
    <img src="../imgs/loading.gif" alt="" style="margin-top:30px ">
</div>

<div class="failed" style="text-align: center;display: none">
    <img src="../imgs/failed.gif" alt="" style="margin-top:30px ">
</div>

<div class="courses" style="display: none">

    <div class="course">
        <img src="" alt="">
        <div class="title">
            <h4 class="name">Java高级应用</h4>
            <h4 class="numbers">67人</h4>
        </div>
    </div>

</div>

</body>
</html>
