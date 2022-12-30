package com.bookstore.bookstore_backend.entity;

import javax.persistence.*;

@Entity
@Table(name="users")
public class UserAuth {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="userID")
    private Integer userID;
    @Column(name="userType")
    private Integer userType;
    @Column(name="userName")
    private String userName;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;

    public UserAuth() { }

    public UserAuth(Integer userID, Integer userType, String userName, String password, String email) {
        this.userID = userID;
        this.userType = userType;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

    public Integer getuserID() {
        return userID;
    }

    public void setuserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }
}
