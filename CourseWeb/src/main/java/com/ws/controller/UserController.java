package com.ws.controller;

import com.ws.domain.Teacher;
import com.ws.service.ITeacherService;
import com.ws.service.impl.TeacherServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户登录控制器
 */

@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/teacher")
    public String teacherLogin(HttpServletRequest req) {
        System.out.println("request" + req.getParameter("username") + ' ' + req.getParameter("password"));

        // 接收参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        ITeacherService teacherService = new TeacherServiceImpl();
        Teacher teacher = teacherService.getInfo(username, password);
        System.out.println(teacher);

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
}
