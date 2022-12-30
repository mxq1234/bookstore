package com.bookstore.bookstore_backend.entity;

public class ConsumeCensus {
    private int userID;
    private String userName;
    private Long consumes;
    private int rank;

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getConsumes() {
        return consumes;
    }

    public void setConsumes(Long consumes) {
        this.consumes = consumes;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }
}
