package com.bookstore.bookstore_backend.serviceimpl;

import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.entity.*;
import com.bookstore.bookstore_backend.service.CensusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@Service
public class CensusServiceImpl implements CensusService {
    @Autowired
    BookDao bookDao;

    @Autowired
    UserDao userDao;

    @Autowired
    OrderDao orderDao;

    @Override
    public List<SaleCensus> censusSale(String limitDate) {
        List<Order> orders = orderDao.getAllOrder();
        Map<Integer, Integer>  map = new TreeMap<>();
        for(int i = 0; i < orders.size(); ++i) {
            Order order = orders.get(i);
            if(order.getTime().compareTo(limitDate) < 0)     continue;
            List<OrderItem> orderItems = order.getOrderItems();
            for(int j = 0; j < orderItems.size(); ++j) {
                OrderItem orderItem = orderItems.get(j);
                Integer bookID = orderItem.getId().getBookID();
                if(map.containsKey(bookID)) {
                    int times = map.get(bookID);
                    times += orderItem.getQuantity();
                    map.put(bookID, times);
                } else {
                    map.put(bookID, orderItem.getQuantity());
                }
            }
        }

        List<Map.Entry<Integer, Integer>> list = new ArrayList<>(map.entrySet());
        list.sort((o1, o2) -> o2.getValue() - o1.getValue());

        List<SaleCensus>  saleCensuses = new ArrayList<>();
        for(int i = 0; i < list.size() && i < 10; ++i) {
            SaleCensus saleCensus = new SaleCensus();
            saleCensus.setBook(bookDao.getBookById(list.get(i).getKey()));
            saleCensus.setSales(list.get(i).getValue());
            saleCensus.setRank(i);
            saleCensuses.add(saleCensus);
        }
        System.out.println(saleCensuses);
        return saleCensuses;
    }

    @Override
    public List<ConsumeCensus> censusConsume(String limitDate) {
        List<Order> orders = orderDao.getAllOrder();
        Map<Integer, Long>  map = new TreeMap<>();
        for(int i = 0; i < orders.size(); ++i) {
            Order order = orders.get(i);
            if(order.getTime().compareTo(limitDate) < 0)     continue;
            Integer userID = order.getUserID();
            if(map.containsKey(userID)) {
                Long payment = map.get(userID);
                payment += order.getPayment();
                map.put(userID, payment);
            } else {
                map.put(userID, order.getPayment());
            }
        }

        List<Map.Entry<Integer, Long>> list = new ArrayList<>(map.entrySet());
        list.sort((o1, o2) -> (int) (o2.getValue() - o1.getValue()));

        List<ConsumeCensus>  consumeCensuses = new ArrayList<>();
        for(int i = 0; i < list.size() && i < 10; ++i) {
            ConsumeCensus consumeCensus = new ConsumeCensus();
            UserAuth userAuth = userDao.getUser(list.get(i).getKey());
            consumeCensus.setUserID(userAuth.getuserID());
            consumeCensus.setUserName(userAuth.getUserName());
            consumeCensus.setConsumes(list.get(i).getValue());
            consumeCensus.setRank(i);
            consumeCensuses.add(consumeCensus);
        }
        System.out.println(consumeCensuses);
        return consumeCensuses;
    }

    @Override
    public List<PrivateCensus> censusPrivate(int userID, String limitDate) {
        List<Order> orders = orderDao.getOrder(userID);
        Map<Integer, Integer>  map = new TreeMap<>();
        for(int i = 0; i < orders.size(); ++i) {
            Order order = orders.get(i);
            if(order.getTime().compareTo(limitDate) < 0)     continue;
            List<OrderItem> orderItems = order.getOrderItems();
            for(int j = 0; j < orderItems.size(); ++j) {
                OrderItem orderItem = orderItems.get(j);
                Integer bookID = orderItem.getId().getBookID();
                if(map.containsKey(bookID)) {
                    int times = map.get(bookID);
                    times += orderItem.getQuantity();
                    map.put(bookID, times);
                } else {
                    map.put(bookID, orderItem.getQuantity());
                }
            }
        }

        List<Map.Entry<Integer, Integer>> list = new ArrayList<>(map.entrySet());
        list.sort((o1, o2) -> o2.getValue() - o1.getValue());

        List<PrivateCensus>  privateCensuses = new ArrayList<>();
        for(int i = 0; i < list.size() && i < 10; ++i) {
            PrivateCensus privateCensus = new PrivateCensus();
            privateCensus.setBook(bookDao.getBookById(list.get(i).getKey()));
            privateCensus.setSales(list.get(i).getValue());
            privateCensus.setRank(i);
            privateCensuses.add(privateCensus);
        }
        System.out.println(privateCensuses);
        return privateCensuses;
    }
}
