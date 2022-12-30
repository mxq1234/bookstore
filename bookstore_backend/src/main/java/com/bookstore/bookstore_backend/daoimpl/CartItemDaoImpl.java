package com.bookstore.bookstore_backend.daoimpl;

import com.bookstore.bookstore_backend.dao.CartItemDao;
import com.bookstore.bookstore_backend.entity.CartItem;
import com.bookstore.bookstore_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
public class CartItemDaoImpl implements CartItemDao {
    @Autowired
    CartRepository cartRepository;

    @Override
    public List<CartItem> getCartItems(int userID) {
        return cartRepository.getCartItems(userID);
    }

    @Override
    public boolean joinCart(int userID, int bookID) {
        try {
            cartRepository.saveAndFlush(new CartItem(bookID, userID, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))));
        } catch (DataAccessException e) {
            return false;
        }
        return true;
    }
}
