package com.bookstore.bookstore_backend.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderItemPK implements Serializable {
    @Column
    private Long orderID;

    @Column
    private Integer bookID;

    public OrderItemPK() { }

    public OrderItemPK(Long orderID, Integer bookID) {
        this.orderID = orderID;
        this.bookID = bookID;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public Integer getBookID() {
        return bookID;
    }

    public void setBookID(Integer bookID) {
        this.bookID = bookID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemPK that = (OrderItemPK) o;
        return orderID.equals(that.orderID) && bookID.equals(that.bookID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderID, bookID);
    }
}
