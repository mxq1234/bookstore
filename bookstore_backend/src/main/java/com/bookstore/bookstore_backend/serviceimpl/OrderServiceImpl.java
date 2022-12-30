package com.bookstore.bookstore_backend.serviceimpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.entity.Order;
import com.bookstore.bookstore_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderDao orderDao;

    @Override
    public List<Order> getOrder(Integer userID) {
        return orderDao.getOrder(userID);
    }

    @Override
    public List<Order> getAllOrder() { return orderDao.getAllOrder(); }

    @Override
    public boolean checkout(Integer userID, JSONObject jsonObject) {
        boolean result = orderDao.addOrder(userID, jsonObject);
        if(!result)  return false;
        return true;
    }
}
