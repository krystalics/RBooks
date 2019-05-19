package com.example.rbooks.backend.controller;

import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorController extends BasicErrorController {

  public ErrorController(
      ErrorAttributes errorAttributes,
      ErrorProperties errorProperties) {
    super(errorAttributes, errorProperties);
  }

  @RequestMapping("/error")
  public String error() {
    return "无权限访问或访问路径错误";
  }

}
