package com.ws.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 用户登录控制器
 */

@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/teacher")
    public String teacherLogin() {
        return "t-index";
    }
}
