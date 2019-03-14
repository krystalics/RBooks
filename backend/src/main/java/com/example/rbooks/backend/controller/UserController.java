package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {

  // 下面生动的显示了 IoC和DI的结构，由Spring Boot自动注入 实现了该接口的 Bean
  private final UserService userService;
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/hello")
  @ResponseBody
  public String home(){
    return "hello world";
  }

  @RequestMapping("/delete")
  public String delete(Model model){
    userService.delete(1);
    model.addAttribute("msg","数据删除成功");
    return "result";
  }

  @GetMapping("/all")
  @ResponseBody
  public List<User> getAll(){
    return userService.getAll();
  }

}
