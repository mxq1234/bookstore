package com.bookstore.bookstore_backend.repository;

import com.bookstore.bookstore_backend.entity.CartItem;
import com.bookstore.bookstore_backend.entity.CartItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, CartItemPK> {
    @Query(value="select new CartItem(b.bookID, c.time, b.price, b.image, b.title, b.stock) " +
            "from Book b, CartItem c where c.id.userID=:userID and b.bookID=c.id.bookID")
    List<CartItem> getCartItems(Integer userID);
}
