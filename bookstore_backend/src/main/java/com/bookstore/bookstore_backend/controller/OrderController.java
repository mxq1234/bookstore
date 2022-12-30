package com.bookstore.bookstore_backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.Order;
import com.bookstore.bookstore_backend.service.OrderService;
import com.bookstore.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    UserService userAuthService;

    String CHECKOUT_SUCCESS_MESSAGE = "下单成功";
    String CHECKOUT_FAIL_MESSAGE = "下单失败，请稍后重试";

    @RequestMapping("/getOrders")
    public List<Order> getOrders() {
        Integer userID = userAuthService.getUserId();
        return orderService.getOrder(userID);
    }

    @RequestMapping("/getAllOrders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrder();
    }

    @RequestMapping("/checkout")
    public Object checkout(@RequestBody JSONObject obj) {
        Integer userID = userAuthService.getUserId();
        boolean success = orderService.checkout(userID, obj);
        JSONObject jsonObject = new JSONObject();
        if(success) {
            jsonObject.put("status", 1);
            jsonObject.put("message", CHECKOUT_SUCCESS_MESSAGE);
        } else {
            jsonObject.put("status", 0);
            jsonObject.put("message", CHECKOUT_FAIL_MESSAGE);
        }
        return jsonObject;
    }
}
