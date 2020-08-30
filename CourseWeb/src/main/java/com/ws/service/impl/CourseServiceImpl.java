package com.ws.service.impl;


import com.alibaba.fastjson.JSONObject;
import com.ws.domain.CoursePack;
import com.ws.service.ICourseService;
import com.ws.util.HttpUtil;

public class CourseServiceImpl implements ICourseService {

    @Override
    public CoursePack getInfo(String courseId) {
        String url = "http://123.56.156.212/Interface/course/getcoursebycid";
        String param = "courseid=" + courseId;
        String json = HttpUtil.sendPost(url, param);
        System.out.println("json " + json);
        return JSONObject.parseObject(json, CoursePack.class);
    }

}
