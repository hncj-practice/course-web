package com.ws.domain;

import java.io.Serializable;

/**
 * 课程的包装类
 * 包含请求的code等信息
 */
public class CoursePack implements Serializable {
    Integer code;
    String message;
    Course data;

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

    public Course getData() {
        return data;
    }

    public void setData(Course data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "CoursePack{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }

    public static class Course {
        String cid;
        String semester;
        String tno;
        String tname;
        String cname;
        String coverimg;
        Integer status;
        Integer snum;

        public String getCid() {
            return cid;
        }

        public void setCid(String cid) {
            this.cid = cid;
        }

        public String getSemester() {
            return semester;
        }

        public void setSemester(String semester) {
            this.semester = semester;
        }

        public String getTno() {
            return tno;
        }

        public void setTno(String tno) {
            this.tno = tno;
        }

        public String getTname() {
            return tname;
        }

        public void setTname(String tname) {
            this.tname = tname;
        }

        public String getCname() {
            return cname;
        }

        public void setCname(String cname) {
            this.cname = cname;
        }

        public String getCoverimg() {
            return coverimg;
        }

        public void setCoverimg(String coverimg) {
            this.coverimg = coverimg;
        }

        public Integer getStatus() {
            return status;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }

        public Integer getSnum() {
            return snum;
        }

        public void setSnum(Integer snum) {
            this.snum = snum;
        }

        @Override
        public String toString() {
            return "Course{" +
                    "cid='" + cid + '\'' +
                    ", semester='" + semester + '\'' +
                    ", tno='" + tno + '\'' +
                    ", tname='" + tname + '\'' +
                    ", cname='" + cname + '\'' +
                    ", coverimg='" + coverimg + '\'' +
                    ", status=" + status +
                    ", snum=" + snum +
                    '}';
        }
    }
}
