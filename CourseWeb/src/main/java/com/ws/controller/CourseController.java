package com.ws.controller;

import com.ws.domain.Course;
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
     * @param request request
     * @return teacher-course
     */
    @RequestMapping("home")
    public String course(HttpServletRequest request) {
        Course course = new Course();
        course.setId(request.getParameter("courseId"));
        HttpSession session = request.getSession();
        session.setAttribute("course", course);
        return "teacher-course";
    }
}
