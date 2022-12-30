package com.bookstore.bookstore_backend.daoimpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.entity.*;
import com.bookstore.bookstore_backend.repository.OrderItemRepository;
import com.bookstore.bookstore_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    EntityManagerFactory entityManagerFactory;

    @Override
    public List<Order> getOrder(Integer userID) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        String orderJPQL = String.format("from Order o where o.userID=%s", userID);
        List<Order> orders = entityManager.createQuery(orderJPQL, Order.class).getResultList();
        for(Order order : orders)
            order.setOrderItems(orderItemRepository.findOrderItemsById_OrderID(order.getOrderID()));
        return orders;
    }

    @Override
    public List<Order> getAllOrder() {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        String orderJPQL = String.format("from Order o");
        List<Order> orders = entityManager.createQuery(orderJPQL, Order.class).getResultList();
        for(Order order : orders)
            order.setOrderItems(orderItemRepository.findOrderItemsById_OrderID(order.getOrderID()));
        return orders;
    }

    @Override
    public boolean addOrder(Integer userID, JSONObject jsonObject) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        EntityTransaction orderTransaction = entityManager.getTransaction();
        orderTransaction.begin();

        String time = jsonObject.getString("time");
        String consignee = jsonObject.getString("consignee");
        String phone = jsonObject.getString("phone");
        String address = jsonObject.getString("address");
        Long payment = Long.parseLong(jsonObject.getString("payment"));

        try {
            Order order = new Order(userID, "待发货", time, consignee, phone, address, payment);
            entityManager.persist(order);

            orderTransaction.commit();
        } catch (Exception e) {
            orderTransaction.rollback();
            return false;
        }

        EntityTransaction otherTransaction = entityManager.getTransaction();

        otherTransaction.begin();

        try {
            Order order = orderRepository.findOrderByUserIDAndTime(userID, time);

            JSONArray items = jsonObject.getJSONArray("items");
            for (int i = 0; i < items.size(); ++i) {
                JSONObject orderItem = items.getJSONObject(i);
                Integer bookID = Integer.parseInt(orderItem.getString("bookID"));
                Integer number = Integer.parseInt(orderItem.getString("number"));
                Long price = Long.parseLong(orderItem.getString("price"));
                OrderItem orderItem1 = new OrderItem(order.getOrderID(), bookID, number, price);
                entityManager.persist(orderItem1);

                CartItem cartItem = entityManager.find(CartItem.class, new CartItemPK(bookID, userID));
                entityManager.remove(cartItem);

                Book book = entityManager.find(Book.class, bookID);
                if (book.getStock() < number) {
                    orderTransaction.rollback();
                    return false;
                }
                book.setStock(book.getStock() - number);
                entityManager.persist(book);
            }

            otherTransaction.commit();
        } catch (Exception e) {
            orderTransaction.rollback();
            otherTransaction.rollback();
            return false;
        }

        return true;
    }
}
