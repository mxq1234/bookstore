package com.bookstore.bookstore_backend.dao;

import com.bookstore.bookstore_backend.entity.UserAuth;

public interface UserDao {
    public UserAuth loginVerify(String userName, String password);

    public Boolean banUser(int userID);

    public Boolean unbanUser(int userID);

    public UserAuth getUser(int userID);

    public UserAuth getUser(String userName);

    public Boolean register(UserAuth userAuth);
}
