package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.UserService;
import com.example.rbooks.backend.serviceImpl.UserServiceImpl;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
  @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)

  public int login(@RequestBody User user) { //用@RequestBody获取前端传过来的参数
    // 前端数据 格式 {username: fff , password: fff}
    return userServiceImpl.login(user); //失败返回一个 -1  成功则是该用户的 id
  }

  @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public int register(@RequestBody User user) { //需要传进来个User参数
    // 传进来的参数为 {name:"" ,password:""}  ，
    return userServiceImpl.register(user); //失败返回一个 -1  成功则是该用户的 id
  }


  @RequestMapping(value = "/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public int delete(@RequestBody Map<String, String> name) {
    return userServiceImpl.delete(name.get("username"));
  }

  @RequestMapping(value = "/update", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public int update(@RequestBody User user) {
    return userServiceImpl.update(user); //默认更新成功，后面有需求再改。
  }
}
