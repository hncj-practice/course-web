package com.ws.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ws.domain.Teacher;
import com.ws.service.ITeacherService;
import com.ws.util.HttpUtil;

public class TeacherServiceImpl implements ITeacherService {

    @Override
    public Teacher getInfo(String username, String password) {
//        http://123.56.156.212/Interface/account/login?username=888888888&password=000000&type=2
        String url = "http://123.56.156.212/Interface/account/login";
        String param = "username=" + username + "&password=" + password + "&type=2";
        // 请求服务器获取数据
        String json = HttpUtil.sendPost(url, param);
        return JSONObject.parseObject(json, Teacher.class);
    }
}
