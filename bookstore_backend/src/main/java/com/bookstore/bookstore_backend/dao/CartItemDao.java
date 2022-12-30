package com.bookstore.bookstore_backend.dao;

import com.bookstore.bookstore_backend.entity.CartItem;

import java.util.List;

public interface CartItemDao {
    public List<CartItem> getCartItems(int userID);

    public boolean joinCart(int userID, int bookID);
}
