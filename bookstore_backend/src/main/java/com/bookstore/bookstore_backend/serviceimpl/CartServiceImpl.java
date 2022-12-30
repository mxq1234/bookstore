package com.bookstore.bookstore_backend.serviceimpl;

import com.bookstore.bookstore_backend.dao.CartItemDao;
import com.bookstore.bookstore_backend.entity.CartItem;
import com.bookstore.bookstore_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartItemDao cartItemDao;

    @Override
    public List<CartItem> getCartItems(int userID) {
        return cartItemDao.getCartItems(userID);
    }

    @Override
    public boolean joinCart(int userID, int bookID) {
        return cartItemDao.joinCart(userID, bookID);
    }
}
