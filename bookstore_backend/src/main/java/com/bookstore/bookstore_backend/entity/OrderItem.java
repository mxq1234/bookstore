package com.bookstore.bookstore_backend.entity;

import javax.persistence.*;

@Entity
@Table(name="orderitems")
public class OrderItem {
    @EmbeddedId
    private OrderItemPK id;

    @Transient
    private String image;

    @Transient
    private String title;

    @Column
    private Integer quantity;

    @Column
    private Long unitPrice;

    public OrderItem() { }

    public OrderItem(Integer bookID, String image, String title, Integer quantity, Long unitPrice) {
        this.id = new OrderItemPK(0L, bookID);
        this.image = image;
        this.title = title;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public OrderItem(Long orderID, Integer bookID, Integer quantity, Long unitPrice) {
        this.id = new OrderItemPK(orderID, bookID);
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public OrderItemPK getId() {
        return id;
    }

    public void setId(OrderItemPK id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Long unitPrice) {
        this.unitPrice = unitPrice;
    }
}
