package com.bookstore.bookstore_backend.dao;

import com.bookstore.bookstore_backend.entity.Book;

import java.util.List;

public interface BookDao {

    public Book getBookById(int id);

    public List<Book> getBooks();

    public void addBook(Book book);

    public void modifyBook(Book book);

    public void deleteBook(int bookID);
}
