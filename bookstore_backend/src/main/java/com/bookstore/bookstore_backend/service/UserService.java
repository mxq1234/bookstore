package com.bookstore.bookstore_backend.service;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.UserAuth;

public interface UserService {
    public UserAuth loginVerify(String userName, String password);

    public boolean checkAuthed();

    public void setSession(JSONObject data);

    public Boolean removeSession();

    public int getUserId();

    public Boolean banUser(int userID);

    public Boolean unbanUser(int userID);

    public Boolean validateUserName(String userName);

    public Boolean register(JSONObject info);
}
