package com.ws.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ws.domain.AdminPack;
import com.ws.service.IAdminService;
import com.ws.util.HttpUtil;

public class AdminServiceImpl implements IAdminService {
    @Override
    public AdminPack getInfo(String user, String password) {
        // http://123.56.156.212/Interface/account/login?username=wsgly&password=000000&type=3
        String url = "http://123.56.156.212/Interface/account/login";
        String param = "username=" + user + "&password=" + password + "&type=3";
        // 请求服务器获取数据
        String json = HttpUtil.sendPost(url, param);
        return JSONObject.parseObject(json, AdminPack.class);
    }
}
