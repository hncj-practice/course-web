package com.ws.service;

import com.ws.domain.AdminPack;

public interface IAdminService {


    AdminPack getInfo(String user, String password);
}
