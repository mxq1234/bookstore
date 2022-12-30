package com.bookstore.bookstore_backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.dao.CartItemDao;
import com.bookstore.bookstore_backend.entity.CartItem;
import com.bookstore.bookstore_backend.service.CartService;
import com.bookstore.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CartController {
    @Autowired
    UserService userService;

    @Autowired
    CartService cartService;

    String JOINCART_SUCCESS_MESSAGE = "添加成功";
    String JOINCART_FAIL_MESSAGE = "添加失败";

    @RequestMapping("/getCartItems")
    public List<CartItem>  getCartItems() {
        int userID = userService.getUserId();
        return cartService.getCartItems(userID);
    }

    @RequestMapping("/joinCart")
    public Object joinCart(@RequestParam("bookID") int bookID) {
        int userID = userService.getUserId();
        boolean success = cartService.joinCart(userID, bookID);
        JSONObject jsonObject = new JSONObject();
        if(success) {
            jsonObject.put("status", 1);
            jsonObject.put("message", JOINCART_SUCCESS_MESSAGE);
        } else {
            jsonObject.put("status", 0);
            jsonObject.put("message", JOINCART_FAIL_MESSAGE);
        }
        return jsonObject;
    }
}
