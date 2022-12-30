package com.bookstore.bookstore_backend.daoimpl;

import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.entity.Book;
import com.bookstore.bookstore_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book getBookById(int id) {
        return bookRepository.findBookByBookID(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public void addBook(Book book) {
        bookRepository.saveAndFlush(book);
    }

    @Override
    public void modifyBook(Book book) {
        bookRepository.saveAndFlush(book);
    }

    @Override
    public void deleteBook(int bookID) {
        bookRepository.deleteById(bookID);
    }
}
