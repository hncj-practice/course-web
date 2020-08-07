package com.ws.service;

import com.ws.domain.Teacher;

/**
 * 教师相关操作的service
 */
public interface ITeacherService {


    /**
     * 获取详情信息
     */
    Teacher getInfo(String username, String password);
}
