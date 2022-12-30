package com.bookstore.bookstore_backend.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartItemPK implements Serializable {
    @Column
    private Integer bookID;

    @Column
    private Integer userID;

    public CartItemPK() { }

    public CartItemPK(Integer bookID, Integer userID) {
        this.bookID = bookID;
        this.userID = userID;
    }

    public Integer getBookID() {
        return bookID;
    }

    public void setBookID(Integer bookID) {
        this.bookID = bookID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItemPK that = (CartItemPK) o;
        return bookID.equals(that.bookID) && userID.equals(that.userID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookID, userID);
    }
}
