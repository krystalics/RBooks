package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.serviceImpl.HomeServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HomeController {

  private final HomeServiceImpl homeServiceImpl;

  @Autowired
  public HomeController(HomeServiceImpl homeServiceImpl) {
    this.homeServiceImpl = homeServiceImpl;
  }

  // 负责加载 主页的信息，注入 HomeService Bean
  @RequestMapping("/home")
  public List<Book> home() {
    return homeServiceImpl.getBooksInfo();
  }

}
