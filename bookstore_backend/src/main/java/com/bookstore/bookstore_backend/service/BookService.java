package com.bookstore.bookstore_backend.service;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.Book;

import java.util.List;

public interface BookService {

    public List<Book> getBooks();

    public Book getBookById(int id);

    public void addNewBook(JSONObject obj);

    public void modifyBook(JSONObject obj);

    public void deleteBook(int bookID);
}
