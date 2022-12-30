package com.bookstore.bookstore_backend.entity;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long orderID;
    private Integer userID;
    private String state;
    private String time;
    private String consignee;
    private String phone;
    private String address;
    private Long payment;

    @OneToMany(cascade={CascadeType.REMOVE,CascadeType.REFRESH},fetch=FetchType.EAGER)
    @JoinColumn(name="orderID")
    @Column(insertable = false, updatable = false)
    private List<OrderItem> orderItems;

    public Order() { }

    public Order(Integer userID, String state, String time, String consignee, String phone, String address, Long payment) {
        this.userID = userID;
        this.state = state;
        this.time = time;
        this.consignee = consignee;
        this.phone = phone;
        this.address = address;
        this.payment = payment;
    }

    public Order(Order order, List<OrderItem> orderItems) {
        this.orderID = order.orderID;
        this.userID = order.userID;
        this.state = order.state;
        this.time = order.time;
        this.consignee = order.consignee;
        this.phone = order.phone;
        this.address = order.address;
        this.payment = order.payment;
        this.orderItems = orderItems;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getPayment() {
        return payment;
    }

    public void setPayment(Long payment) {
        this.payment = payment;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
