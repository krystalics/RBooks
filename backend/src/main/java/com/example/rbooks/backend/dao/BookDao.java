package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.Book;
import java.util.List;

public interface BookDao {


  void addBook(Book book); //存储书本进数据库，基本信息放在books表，具体章节内容放在chapter表中

  void deleteBook(int id); //删除

  void updateBook(Book book);

  Book getBookById(int id); //获得该id的书

  Book getBookByNameAndAuthor(String name,String author);

  List<Book> getAllBooks(); //获得除了id的其他书本信息，用于展示在页面上

  List<Book> getBooksByAuthor(String author); //用于 mypage服务
}
