package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.controller.mypage.MyPage;
import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.dao.FollowDao;
import com.example.rbooks.backend.dao.InformationDao;
import com.example.rbooks.backend.dao.UserDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Followauthor;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.Followbook;
import com.example.rbooks.backend.entity.FollowbookId;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.MyPageService;
import com.example.rbooks.backend.service.ReadService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyPageServiceImpl implements MyPageService {


  private final InformationDao informationDaoImpl;

  private final BookDao bookDaoImpl;

  private final FollowDao followDaoImpl;

  private final UserDao userDaoImpl;

  private final ObjectMapper mapper;

  @Autowired
  public MyPageServiceImpl(InformationDao informationDaoImpl, BookDao bookDaoImpl,
      FollowDao followDaoImpl, UserDao userDaoImpl, ObjectMapper mapper) {
    this.informationDaoImpl = informationDaoImpl;
    this.bookDaoImpl = bookDaoImpl;
    this.followDaoImpl = followDaoImpl;
    this.userDaoImpl = userDaoImpl;
    this.mapper = mapper;
  }

  @Override
  public Information getInformation(int userid) {
    return informationDaoImpl.getInformation(userid);
  }

  @Override
  public List<Book> getBooks_write(String author) {
    return bookDaoImpl.getBooksByAuthor(author);
  }

  @Override
  public List<Book> getBooks_follow(int userid) {
    List<Followbook> all_follow_books = followDaoImpl.getAllBooks(); //要在这张表中寻找 含有userid的
    List<Book> followBooks = new ArrayList<>();
    for (Followbook followbook : all_follow_books) {
      if (followbook.getFollowbookid().getUserid() == userid) {
        followBooks.add(bookDaoImpl.getBookById(followbook.getFollowbookid().getBookid()));
      }
    }

    return followBooks;
  }

  @Override
  public List<User> getUsers_follow(int userid) { //用户 关注的作者
    List<Followauthor> all_follow_users = followDaoImpl.getAllUsers(); //要在这张表中寻找 含有userid的
    List<User> followusers = new ArrayList<>();
    for (Followauthor followauthor : all_follow_users) {
      if (followauthor.getFollowauthorid().getUserid() == userid) {
        // 要把 password处理掉，
        User user = userDaoImpl.getUserById(followauthor.getFollowauthorid().getAuthorid());
        user.setPassword("");
        followusers.add(user);
      }
    }

    return followusers;
  }

  @Override
  public List<User> getUsers_be_followed(int userid) {
    List<Followauthor> all_follow_users = followDaoImpl.getAllUsers(); //要在这张表中寻找 含有userid的
    List<User> followusers = new ArrayList<>();
    for (Followauthor followauthor : all_follow_users) {
      if (followauthor.getFollowauthorid().getAuthorid() == userid) { //与上面的区别就是，细节不一致
        User user = userDaoImpl.getUserById(followauthor.getFollowauthorid().getUserid());
        user.setPassword("");
        followusers.add(user);
      }
    }

    return followusers;

  }

  public Boolean isFollowAuthor(FollowauthorId followauthorId) {
    return followDaoImpl.exsitsFollowAuthor(followauthorId);
  }

  public Boolean isFollowBook(FollowbookId followbookId) {
    return followDaoImpl.exsitsFollowBook(followbookId);
  }

  public String myPage(int userid) {
    Information information = getInformation(userid);
    if (information == null) {
      return "找不到该用户";
    }

    List<Book> bookList_write = getBooks_write(information.getUsername()); //获得用户写的书集
    List<Book> bookList_follow = getBooks_follow(userid);
    List<User> userList_follow = getUsers_follow(userid);
    List<User> userList_be_followed = getUsers_be_followed(userid);
    // pojo 需要先序列化才能传输， 而且必须是 public的字段才能序列化
    String response = "";
    MyPage myPage = new MyPage(information, bookList_write, bookList_follow, userList_follow,
        userList_be_followed);
    try {
      response = mapper.writeValueAsString(myPage);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }

    return response;
  }


}
