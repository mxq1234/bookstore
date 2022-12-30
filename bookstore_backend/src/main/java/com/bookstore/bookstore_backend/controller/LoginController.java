package com.bookstore.bookstore_backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.UserAuth;
import com.bookstore.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    UserService userService;

    String LOGIN_SUCCESS_MESSAGE = "登录成功";
    String LOGIN_FAIL_MESSAGE = "登录失败，用户名或密码错误或不存在";
    String LOGOUT_SUCCESS_MESSAGE = "退出成功";
    String LOGOUT_FAIL_MESSAGE = "退出失败，请重试";

    @CrossOrigin
    @RequestMapping("/login")
    public Object login(@RequestBody Map<String, String> params) {
        String userName = params.get("userName");
        String password = params.get("password");
        System.out.println(userName);
        System.out.println(password);
        UserAuth userAuth = userService.loginVerify(userName, password);
        System.out.println(userAuth);

        JSONObject jsonObject = new JSONObject();
        if(userAuth != null) {
            jsonObject.put("status", 1);
            jsonObject.put("message", LOGIN_SUCCESS_MESSAGE);
            JSONObject userAuthJSON = (JSONObject) JSONObject.toJSON(userAuth);
            userAuthJSON.remove("password");
            userService.setSession(userAuthJSON);
            jsonObject.put("data", userAuthJSON);
        } else {
            jsonObject.put("status", 0);
            jsonObject.put("message", LOGIN_FAIL_MESSAGE);
            jsonObject.put("data", null);
        }
        return jsonObject;
    }

    @CrossOrigin
    @RequestMapping("/logout")
    public Object logout() {
        Boolean status = userService.removeSession();

        JSONObject jsonObject = new JSONObject();
        if(status){
            jsonObject.put("status", 1);
            jsonObject.put("message", LOGOUT_SUCCESS_MESSAGE);
        } else {
            jsonObject.put("status", 0);
            jsonObject.put("message", LOGOUT_FAIL_MESSAGE);
        }
        return jsonObject;
    }

    @CrossOrigin
    @RequestMapping("/checkAuthed")
    public Object checkAuthed() {
        boolean isAuthed = userService.checkAuthed();
        JSONObject jsonObject = new JSONObject();
        if(isAuthed) {
            jsonObject.put("status", 1);
        } else {
            jsonObject.put("status", 0);
        }
        return jsonObject;
    }

    @CrossOrigin
    @RequestMapping("/ban")
    public Object banUser(@RequestParam int userID) {
        System.out.println(userID);
        Boolean result = userService.banUser(userID);
        JSONObject jsonObject = new JSONObject();
        if(result) {
            jsonObject.put("status", 1);
        } else {
            jsonObject.put("status", 0);
        }
        return jsonObject;
    }

    @RequestMapping("/unban")
    public Object unbanUser(@RequestParam int userID) {
        Boolean result = userService.unbanUser(userID);
        JSONObject jsonObject = new JSONObject();
        if(result) {
            jsonObject.put("status", 1);
        } else {
            jsonObject.put("status", 0);
        }
        return jsonObject;
    }

    @CrossOrigin
    @RequestMapping("/validateUserName")
    public Object validateUserName(@RequestParam String userName) {
        JSONObject jsonObject = new JSONObject();
        if(userService.validateUserName(userName)) {
            jsonObject.put("status", 1);
        } else {
            jsonObject.put("status", 0);
        }
        return jsonObject;
    }

    @CrossOrigin
    @RequestMapping("/register")
    public Object register(@RequestBody JSONObject jsonObject) {
        JSONObject jsonObject1 = new JSONObject();
        if(userService.register(jsonObject)) {
            jsonObject.put("status", 1);
        } else {
            jsonObject.put("status", 0);
        }
        return jsonObject;
    }
}
