package com.bookstore.bookstore_backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.UserAuth;
import com.bookstore.bookstore_backend.service.CensusService;
import com.bookstore.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CensusController {
    @Autowired
    CensusService censusService;

    @Autowired
    UserService userService;

    @RequestMapping("/census")
    public Object census(@RequestParam String limitDate) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("sales", censusService.censusSale(limitDate));
        jsonObject.put("consume", censusService.censusConsume(limitDate));
        return jsonObject;
    }

    @RequestMapping("/userCensus")
    public Object userCensus(@RequestParam String limitDate) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data", censusService.censusPrivate(userService.getUserId(), limitDate));
        return jsonObject;
    }
}
