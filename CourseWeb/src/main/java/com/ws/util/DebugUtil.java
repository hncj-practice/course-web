package com.ws.util;

/**
 * 调试用工具类
 */
public class DebugUtil {

    public static void log(Object obj, Object msg) {
        System.out.println("from[" + obj.getClass().getName() + "] " + msg + "");
    }
}
