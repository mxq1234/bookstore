package com.bookstore.bookstore_backend.repository;

import com.bookstore.bookstore_backend.entity.OrderItem;
import com.bookstore.bookstore_backend.entity.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
    @Query(value="select new OrderItem(b.bookID, b.image, b.title, o.quantity, o.unitPrice) " +
            "from Book b, OrderItem o where b.bookID=o.id.bookID and o.id.orderID=:orderID")
    List<OrderItem> findOrderItemsById_OrderID(Long orderID);
}
