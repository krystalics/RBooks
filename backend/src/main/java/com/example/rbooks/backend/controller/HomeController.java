package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.service.HomeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  public List<Book> getHot(@RequestParam int page) {
    return homeServiceImpl.getHotBooksInfo(page);
  }

  @RequestMapping("/getnew")
  public List<Book> getNew(@RequestParam int page) {

    return homeServiceImpl.getNewBooksInfo(page);
  }

  @RequestMapping("/getsearch")
  public List<Book> getSearch(@RequestParam String word) {
    return homeServiceImpl.getSearchBooksInfo(word);
  }

  @RequestMapping("/gettag")
  public List<Book> getTag(@RequestParam String tag) {
    return homeServiceImpl.getTagBooks(tag);
  }


}
