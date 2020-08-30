package com.ws.domain;

import java.io.Serializable;

public class TeacherPack implements Serializable {

    Integer code;
    String message;
    TeacherPack.Teacher data;

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

    public Teacher getData() {
        return data;
    }

    public void setData(Teacher data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "TeacherPack{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }

    /**
     * Teacher类
     */
    public static class Teacher {
        String tno;
        String pwd;
        String name;
        String sex;
        String email;
        String avatar;
        Integer status;

        public String getTno() {
            return tno;
        }

        public void setTno(String tno) {
            this.tno = tno;
        }

        public String getPwd() {
            return pwd;
        }

        public void setPwd(String pwd) {
            this.pwd = pwd;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getSex() {
            return sex;
        }

        public void setSex(String sex) {
            this.sex = sex;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getAvatar() {
            return avatar;
        }

        public void setAvatar(String avatar) {
            this.avatar = avatar;
        }

        public Integer getStatus() {
            return status;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }

        @Override
        public String toString() {
            return "Teacher{" +
                    "tno='" + tno + '\'' +
                    ", pwd='" + pwd + '\'' +
                    ", name='" + name + '\'' +
                    ", sex='" + sex + '\'' +
                    ", email='" + email + '\'' +
                    ", avatar='" + avatar + '\'' +
                    ", status=" + status +
                    '}';
        }
    }
}
