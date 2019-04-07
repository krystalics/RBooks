package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowbookId;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.entity.User;
import java.util.List;

public interface MyPageService {
  // 个人信息服务，包括收藏的书单，关注的作者和写的书
  //先写 获得information的接口
  Information getInformation(int userid);

  // 自己写的书
  List<Book> getBooks_write(String author);

  //收藏的书单
  List<Book> getBooks_follow(int userid);

  // 用户关注的作者
  List<User> getUsers_follow(int userid);

  //被多少人关注
  List<User> getUsers_be_followed(int authorid);

  String myPage(int userid);

  Boolean isFollowAuthor(FollowauthorId followauthorId);

  Boolean isFollowBook(FollowbookId followbookId);
}
