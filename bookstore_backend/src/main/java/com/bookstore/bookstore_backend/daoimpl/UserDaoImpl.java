package com.bookstore.bookstore_backend.daoimpl;

import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.entity.User;
import com.bookstore.bookstore_backend.entity.UserAuth;
import com.bookstore.bookstore_backend.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserAuthRepository userAuthRepository;

    @Override
    public UserAuth loginVerify(String userName, String password) {
        return userAuthRepository.findUserAuthByUserNameAndPassword(userName, password);
    }

    @Override
    public Boolean banUser(int userID) {
        UserAuth userAuth = userAuthRepository.findUserAuthByUserID(userID);
        if(userAuth.getUserType() != 0)     return false;
        userAuth.setUserType(-1);
        userAuthRepository.save(userAuth);
        return true;
    }

    @Override
    public Boolean unbanUser(int userID) {
        UserAuth userAuth = userAuthRepository.findUserAuthByUserID(userID);
        if(userAuth.getUserType() != -1)     return false;
        userAuth.setUserType(0);
        userAuthRepository.save(userAuth);
        return true;
    }

    @Override
    public UserAuth getUser(String userName) {
        try {
            return userAuthRepository.findUserAuthByUserName(userName);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserAuth getUser(int userID) {
        return userAuthRepository.findUserAuthByUserID(userID);
    }

    @Override
    public Boolean register(UserAuth userAuth) {
        try {
            userAuthRepository.saveAndFlush(userAuth);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
