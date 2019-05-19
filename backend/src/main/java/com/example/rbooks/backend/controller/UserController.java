package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.auth.Authorization;
import com.example.rbooks.backend.auth.IdentityEnums;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.UserService;
import com.example.rbooks.backend.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userServiceImpl;

  @Autowired
  public UserController(UserServiceImpl userServiceImpl) {
    this.userServiceImpl = userServiceImpl;
  }

  //会在登录成功之后 ， 返回一个SessionId，用于后续验证，还有@CookieValue来获取cookie值

  @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public int login(@RequestBody User user) {
    return userServiceImpl.login(user.getName(), user.getPassword());
  }

  @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  //前端传来form中的信息，是这个形式
  public int register(@RequestBody User user) { //需要传进来个User参数
    // 传进来的参数为 {name:"" ,password:""}  ，
    return userServiceImpl.register(user.getName(), user.getPassword()); //失败返回一个 -1  成功则是该用户的 id
  }

  @Authorization(value = {IdentityEnums.SUPER_ADMIN})
  @DeleteMapping(value = "/delete")
  public String delete(@RequestParam("name") String name) {
    userServiceImpl.delete(name);
    return "删除成功";
  }


  @RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String update(@RequestBody User user) {
    userServiceImpl.update(user.getName(), user.getPassword()); //默认更新成功，后面有需求再改。
    return "更新成功";
  }
}
