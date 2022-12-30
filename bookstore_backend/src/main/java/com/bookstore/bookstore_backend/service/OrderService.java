package com.bookstore.bookstore_backend.service;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.Order;

import java.util.List;

public interface OrderService {
    public List<Order> getOrder(Integer userID);

    public List<Order> getAllOrder();

    public boolean checkout(Integer userID, JSONObject jsonObject);
}
