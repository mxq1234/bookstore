package com.bookstore.bookstore_backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.bookstore_backend.entity.Book;
import com.bookstore.bookstore_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @CrossOrigin
    @RequestMapping("/getBooks")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @CrossOrigin
    @RequestMapping("/getBook")
    public Book getBookById(@RequestParam("id") int id){
        return bookService.getBookById(id);
    }

    @CrossOrigin
    @RequestMapping("/addNewBook")
    public List<Book> addNewBook(@RequestBody JSONObject obj)
    {
        bookService.addNewBook(obj);
        return bookService.getBooks();
    }

    @CrossOrigin
    @RequestMapping("/modifyBook")
    public List<Book> modifyBook(@RequestBody JSONObject obj)
    {
        bookService.modifyBook(obj);
        return bookService.getBooks();
    }

    @CrossOrigin
    @RequestMapping("/deleteBook")
    public List<Book> deleteBook(@RequestParam int bookID)
    {
        bookService.deleteBook(bookID);
        return bookService.getBooks();
    }
}
