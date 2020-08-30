package com.ws.controller;

import com.ws.domain.CoursePack;
import com.ws.service.ICourseService;
import com.ws.service.impl.CourseServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("course")
public class CourseController {

    /**
     * 跳转到对应的课程
     *
     * @param req request
     * @return teacher-course
     */
    @RequestMapping("home")
    public String course(HttpServletRequest req) {
        String courseId = req.getParameter("courseId");
        ICourseService courseService = new CourseServiceImpl();
        CoursePack coursePack = courseService.getInfo(courseId);

        // 判断有没有请求成功
        if (coursePack.getCode() == 200) {
            HttpSession session = req.getSession();
            session.setAttribute("course", coursePack.getData());
            return "teacher-course";
        } else {
            return "error-login";
        }

    }
}
