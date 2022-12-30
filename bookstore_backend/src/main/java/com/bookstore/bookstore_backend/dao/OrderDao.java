package com.bookstore.bookstore_backend.dao;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.Order;

import java.util.List;

public interface OrderDao {
    public List<Order> getOrder(Integer userID);

    public List<Order> getAllOrder();

    public boolean addOrder(Integer userID, JSONObject jsonObject);
}
