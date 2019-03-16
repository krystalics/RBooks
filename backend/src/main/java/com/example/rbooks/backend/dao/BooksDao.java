package com.example.rbooks.backend.dao;

public interface BooksDao {

  int getId(); //获得书的 id 好为其他表服务

  void storeBookInfo(); //存储书本进数据库，基本信息放在books表，具体章节内容放在chapter表中

  void deleteBook(); //删除书本

  void updateBookInfo();

  String getBookInfo(); //获得除了id的其他书本信息，用于展示在页面上


}
