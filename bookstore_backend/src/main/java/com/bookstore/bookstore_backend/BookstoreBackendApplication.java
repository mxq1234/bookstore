package com.bookstore.bookstore_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.HTML;

@ServletComponentScan(basePackages = "com.bookstore.bookstore_backend.controller")
@CrossOrigin(origins = "*", maxAge = 3600)
@SpringBootApplication
public class BookstoreBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookstoreBackendApplication.class, args);
    }
}
