package com.bookstore.bookstore_backend.controller;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "corsFilter", urlPatterns = {"/*"})
public class CorsFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
        throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        System.out.println("here");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-type, Access-Token, Authorization, ybg");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() { }
}
