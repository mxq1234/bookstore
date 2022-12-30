package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.entity.CartItem;

import java.util.List;

public interface CartService {
    public List<CartItem> getCartItems(int userID);

    public boolean joinCart(int userID, int bookID);
}
