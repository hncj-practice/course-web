package com.ws.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Controller
@RequestMapping("/user")
public class TestController {
    @RequestMapping("/test")
    public String CJ(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        // 取数组
        String[] s = request.getParameterValues("courses"); //获取数组参数
        System.out.println(Arrays.toString(s));
        return "success";
    }
}
