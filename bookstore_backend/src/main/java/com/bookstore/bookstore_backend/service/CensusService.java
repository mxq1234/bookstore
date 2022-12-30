package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.entity.ConsumeCensus;
import com.bookstore.bookstore_backend.entity.PrivateCensus;
import com.bookstore.bookstore_backend.entity.SaleCensus;

import java.util.List;

public interface CensusService {
    public List<SaleCensus> censusSale(String limitDate);

    public List<ConsumeCensus> censusConsume(String limitDate);

    public List<PrivateCensus> censusPrivate(int userID, String limitDate);
}
