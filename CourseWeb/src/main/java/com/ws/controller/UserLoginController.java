package com.ws.controller;

import com.ws.domain.TeacherPack;
import com.ws.service.ITeacherService;
import com.ws.service.impl.TeacherServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
        TeacherPack teacherPack = teacherService.getInfo(username, password);


        // 请求正常
        if (teacherPack.getCode() == 200) {
            // 设置bean
            HttpSession session = req.getSession();
            session.setAttribute("teacher", teacherPack.getData());
            return "teacher-index";
        }
        // 不正常
        else {
            return "error-login";
        }
    }

    /**
     * 跳转到管理员页面
     *
     * @return admin.jsp
     */
    @RequestMapping("/admin")
    public String adminLogin(HttpServletRequest req) {
        HttpSession session = req.getSession();
        return "admin";
    }


}
