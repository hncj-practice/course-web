package com.ws.service;

import com.ws.domain.TeacherPack;

public interface ITeacherService {

    TeacherPack getInfo(String username, String password);
}
