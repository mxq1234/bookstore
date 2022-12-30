package com.bookstore.bookstore_backend.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.entity.Book;
import com.bookstore.bookstore_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public Book getBookById(int id){
        return bookDao.getBookById(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public void addNewBook(JSONObject obj) {
        Book book = new Book();
        book.setBookID(null);
        book.setAuthor(obj.getString("author"));
        book.setStock(Integer.parseInt(obj.getString("stock")));
        book.setISBN(obj.getString("isbn"));
        book.setTitle(obj.getString("title"));
        book.setImage(obj.getString("url"));
        book.setPrice(Long.parseLong(obj.getString("price")));
        book.setPress(obj.getString("press"));
        book.setDescription(obj.getString("description"));
        bookDao.addBook(book);
    }

    @Override
    public void modifyBook(JSONObject obj) {
        Book book = bookDao.getBookById(Integer.parseInt(obj.getString("bookID")));
        book.setAuthor(obj.getString("author"));
        book.setStock(Integer.parseInt(obj.getString("stock")));
        book.setISBN(obj.getString("isbn"));
        book.setTitle(obj.getString("title"));
        book.setImage(obj.getString("url"));
        bookDao.modifyBook(book);
    }

    @Override
    public void deleteBook(int bookID) {
        bookDao.deleteBook(bookID);
    }
}
