package com.ws.servlet;

import com.ws.domain.Teacher;
import com.ws.service.ITeacherService;
import com.ws.service.impl.TeacherServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 判断教师用户名和密码是否正确等
 */
public class TLoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        req.setCharacterEncoding("utf-8");
        PrintWriter out = resp.getWriter();
        // 接收参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        ITeacherService teacherService = new TeacherServiceImpl();
        Teacher teacher = teacherService.getInfo(username, password);

        // 请求正常
        if (teacher.getCode() == 200) {
            // 设置bean
            req.setAttribute("teacher", teacher);
            req.getRequestDispatcher("t-index.jsp").forward(req, resp);
        }
        // 不正常
        else {
            out.println("Error");
        }
    }
}
