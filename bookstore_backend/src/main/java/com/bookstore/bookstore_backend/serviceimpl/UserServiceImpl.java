package com.bookstore.bookstore_backend.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.entity.UserAuth;
import com.bookstore.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    @Override
    public UserAuth loginVerify(String userName, String password) {
        return userDao.loginVerify(userName, password);
    }

    @Override
    public boolean checkAuthed() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null)     return true;
        }
        return false;
    }

    @Override
    public void setSession(JSONObject data) {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession();

            for(Object str:data.keySet()){
                String key = (String)str;
                Object val = data.get(key);
                session.setAttribute(key, val);
            }
        }
    }

    @Override
    public Boolean removeSession(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null) {
                session.invalidate();
            }
        }
        return true;
    }

    @Override
    public int getUserId(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null)
                return (Integer)session.getAttribute("userID");
        }
        return -1;
    }

    @Override
    public Boolean banUser(int userID)
    {
        return userDao.banUser(userID);
    }

    @Override
    public Boolean unbanUser(int userID)
    {
        return userDao.unbanUser(userID);
    }

    @Override
    public Boolean validateUserName(String userName) {
        return (userDao.getUser(userName) == null);
    }

    @Override
    public Boolean register(JSONObject info) {
        UserAuth userAuth = new UserAuth(null, 0, info.getString("userName"), info.getString("password"), info.getString("email"));
        return userDao.register(userAuth);
    }
}
