<%--
  Created by IntelliJ IDEA.
  User: Tanyiqu
  Date: 2020/8/30
  Time: 10:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课程</title>
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
    <link rel="stylesheet" href="../css/teacher-course.css">

    <!-- 工具类和常量类 -->
    <script src="../js/util.js"></script>
    <script src="../js/interfaces.js"></script>

    <!-- 自己的js -->
    <script src="../js/teacher-course.js"></script>

    <!-- 页面可能用到的js代码 -->
    <script>
        let currCourseId = '${sessionScope.course.cid}';
        let teacherId = '${sessionScope.teacher.tno}';
        let teacherPassword = '${sessionScope.teacher.pwd}';
    </script>

</head>

<body>
<!-- 对话框 -->
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
                <button id="modelCancel" type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
                <button id="modelConfirm" type="button" class="btn btn-primary">
                    确定
                </button>
            </div>
        </div>
    </div>
</div>

<header>

    <img src="../imgs/logo.png" alt="">
    <h2>网络课程助手（logo暂定）</h2>

    <div class="account">
        <span>吴硕</span>
        <img id="headAvatar" src="../imgs/头像.png" alt="">

    </div>
</header>

<div class="headerwrap">
    <h2 class="course-name" id="courseName"> ${sessionScope.course.cname} </h2>
    <ul>
        <li class="active" id="chapterManage"><span>章节管理</span></li>
        <li class="inactive" id="paperManage"><span>试卷管理</span></li>
        <li class="inactive" id="topicManage"><span>话题管理</span></li>
        <li class="inactive" id="studentsInfo"><span>学生情况</span></li>
        <li class="inactive" id="archive"><span>归档</span></li>
    </ul>
</div>

<!-- 章节 -->
<main id="chapterContain">
    <h2 class="title">目录</h2>
    <ul class="chapters-ul">
        <li>第一章</li>
        <li>第二章</li>
        <li>第三章</li>
        <li>第四章</li>
    </ul>
</main>

<main id="paperContain" style="display: none;">
    <button>手动组卷</button>
    <button id="randomPaper">自动出卷</button>
    <!-- 试卷ul -->
    <ul class="papers-ul">
        <li>
            <h3>暂无试卷，请添加！</h3>
        </li>
        <!--        <li>-->
        <!--            <img class="delete" src="../imgs/delete.png" alt="">-->
        <!--            <img class="update" src="../imgs/update.png" alt="">-->
        <!--            <p>试卷名</p>-->
        <!--            <p>开始：2020-08-24 08:30</p>-->
        <!--            <p>结束：2020-08-24 11:30</p>-->
        <!--            <p>状态：已结束</p>-->
        <!--        </li>-->
    </ul>

    <!--  随机组卷面板  -->
    <div class="random-paper">
        <p>所选章节</p>
        <p>随机选择题数：</p>
        <p>随机填空题数：</p>
        <p>随机判断题数：</p>
        <button class="ensure-random-paper">确定</button>
    </div>

    <!--  随机组卷成功预览面板  -->
    <div class="random-paper-preview">
        <h3>试卷预览</h3>
        <p>选择题</p>
        <ul id="previewXZ">

        </ul>
        <p>填空题</p>
        <p>判断题</p>
        <button class="ensure-random-paper-new">确定</button>
    </div>

</main>

<main id="topicContain" style="display: none;">

    <button>新建话题</button>
    <ul class="topics-ul">
        <li>
            <img src="../imgs/头像.png" alt="">
            <div class="right">
                <p class="who-start">发起人</p>
                <h5 class="title">话题标题</h5>
                <p class="content">话题内容</p>
                <div class="comments">
                    <div class="comment">
                        <span class="who-commit">评论人</span>
                        <span>评论时间</span>
                        <p class="comment-content">评论内容</p>
                    </div>

                    <button>查看全部</button>
                </div>
            </div>
        </li>

        <li>
            <img src="../imgs/头像.png" alt="">
            <div class="right">
                <p class="who-start">发起人</p>
                <h5 class="title">话题标题</h5>
                <p class="content">话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容话题内容</p>
                <div class="comments">
                    <div class="comment">
                        <span class="who-commit">评论人</span>
                        <span>评论时间</span>
                        <p class="comment-content">评论内容</p>
                    </div>

                    <button>查看全部</button>
                </div>
            </div>
        </li>

    </ul>
</main>

</body>
</html>
