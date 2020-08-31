package com.ws.domain;

import java.io.Serializable;

public class AdminPack implements Serializable {

    Integer code;
    String message;
    AdminPack.Admin data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Admin getData() {
        return data;
    }

    public void setData(Admin data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "AdminPack{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }

    /**
     * Admin类
     */
    public static class Admin {
        String adminAccount;
        String adminPwd;

        public String getAdminAccount() {
            return adminAccount;
        }

        public void setAdminAccount(String adminAccount) {
            this.adminAccount = adminAccount;
        }

        public String getAdminPwd() {
            return adminPwd;
        }

        public void setAdminPwd(String adminPwd) {
            this.adminPwd = adminPwd;
        }

        @Override
        public String toString() {
            return "Admin{" +
                    "adminAccount='" + adminAccount + '\'' +
                    ", adminPwd='" + adminPwd + '\'' +
                    '}';
        }
    }
}
