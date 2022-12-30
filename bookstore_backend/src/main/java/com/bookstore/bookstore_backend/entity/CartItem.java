package com.bookstore.bookstore_backend.entity;

import javax.persistence.*;

@Entity
@Table(name="cartitems")
public class CartItem {
    @EmbeddedId
    private CartItemPK id;
    private String time;
    @Transient
    private Long price;
    @Transient
    private String image;
    @Transient
    private String title;
    @Transient
    private Integer stock;

    public CartItem() { }

    public CartItem(Integer bookID, Integer userID, String time) {
        this.id = new CartItemPK(bookID, userID);
        this.time = time;
    }

    public CartItem(Integer bookID, String time, Long price, String image, String title, Integer stock) {
        this.id = new CartItemPK(bookID, 0);
        this.time = time;
        this.price = price;
        this.image = image;
        this.title = title;
        this.stock = stock;
    }

    public CartItemPK getId() {
        return id;
    }

    public void setId(CartItemPK id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
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

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
