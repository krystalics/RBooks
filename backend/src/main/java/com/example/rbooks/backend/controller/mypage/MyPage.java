package com.example.rbooks.backend.controller.mypage;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.entity.User;
import java.io.Serializable;
import java.util.List;

public class MyPage {

  public Information information; //个人信息
  public List<Book> bookList_write; //写的书
  public List<Book> bookList_follow; //收藏的书
  public List<User> userList_follow; //关注的人
  public List<User> userList_be_followed; // 关注他的人

  public MyPage(Information information, List<Book> bookList_write, List<Book> bookList_follow,
      List<User> userList_follow, List<User> userList_be_followed) {
    this.information = information;
    this.bookList_follow = bookList_follow;
    this.bookList_write = bookList_write;
    this.userList_be_followed = userList_be_followed;
    this.userList_follow = userList_follow;
  }
}
