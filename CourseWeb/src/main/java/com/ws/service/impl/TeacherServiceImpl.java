package com.ws.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ws.domain.Teacher;
import com.ws.service.ITeacherService;
import com.ws.util.HttpUtil;

public class TeacherServiceImpl implements ITeacherService {

    @Override
    public Teacher getInfo(String username, String password) {
        String url = "http://123.56.156.212/Interface/teacher/login";
        String param = "username=" + username + "&password=" + password;
        // 请求服务器获取数据
        String json = HttpUtil.sendPost(url, param);
        return JSONObject.parseObject(json, Teacher.class);
    }
}
