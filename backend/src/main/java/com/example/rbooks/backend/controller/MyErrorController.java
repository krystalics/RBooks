package com.example.rbooks.backend.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyErrorController implements ErrorController {


  @RequestMapping("/error")
  public String error() {
    return "无权限访问或访问路径错误";
  }

  @Override
  public String getErrorPath() {
    return "/error";
  }
}
