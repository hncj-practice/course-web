package com.ws.controller;

import com.ws.domain.Teacher;
import com.ws.service.ITeacherService;
import com.ws.service.impl.TeacherServiceImpl;
import com.ws.util.DebugUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户登录控制器
 */

@Controller
@RequestMapping("/user")
public class UserLoginController {

    /**
     * /user/login
     * 跳转登录页面
     *
     * @return login.jsp
     */
    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    /**
     * /user/teacher
     * 跳转教师页面
     *
     * @param req request
     * @return 成功：t-index.jsp 失败：Login-Error.jsp
     */
    @RequestMapping("/teacher")
    public String teacherLogin(HttpServletRequest req) {
        // 接收参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        ITeacherService teacherService = new TeacherServiceImpl();
        Teacher teacher = teacherService.getInfo(username, password);
        System.out.println(teacher);
        DebugUtil.log(this, teacher);

        // 请求正常
        if (teacher.getCode() == 200) {
            // 设置bean
            req.setAttribute("teacher", teacher);
            return "t-index";
        }
        // 不正常
        else {
            return "Login-Error";
        }
    }

    @RequestMapping("/admin")
    public String adminLogin(){
        return "admin";
    }


}
