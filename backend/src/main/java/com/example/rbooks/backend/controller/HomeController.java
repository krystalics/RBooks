package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.service.HomeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/home")
public class HomeController {

  private final HomeService homeServiceImpl;

  @Autowired
  public HomeController(HomeService homeServiceImpl) {
    this.homeServiceImpl = homeServiceImpl;
  }

  // 负责加载 主页的信息，注入 HomeService Bean
  @RequestMapping("/getall")
  public List<Book> home() {
    return homeServiceImpl.getBooksInfo();
  }

  @RequestMapping("/gethot")
  public List<Book> getHot(){
//    Iterable<Book> books=homeServiceImpl.
    return homeServiceImpl.getHotBooksInfo();
  }

  @RequestMapping("/getnew")
  public List<Book> getNew(){
//    Iterable<Book> books=homeServiceImpl.
    return homeServiceImpl.getNewBooksInfo();
  }


}
