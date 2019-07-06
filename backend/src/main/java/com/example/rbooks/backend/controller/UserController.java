package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.auth.Authorization;
import com.example.rbooks.backend.auth.IdentityEnums;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.SettingsService;
import com.example.rbooks.backend.service.UserService;
import com.example.rbooks.backend.serviceImpl.UserServiceImpl;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
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

  @Autowired private SettingsService settingsService;

  private final UserService userServiceImpl;

  @Autowired
  public UserController(UserServiceImpl userServiceImpl) {
    this.userServiceImpl = userServiceImpl;
  }

  // 会在登录成功之后 ， 返回一个SessionId，用于后续验证，还有@CookieValue来获取cookie值

  @RequestMapping(
      value = "/login",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public int login(@RequestBody User user) {
    return userServiceImpl.login(user.getName(), user.getPassword());
  }

  @RequestMapping(
      value = "/register",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  // 前端传来form中的信息，是这个形式
  public int register(@RequestParam Map<String, String> body) { // 需要传进来个User参数
    return analyseData(body); // 失败返回一个 -1  成功则是该用户的 id
  }

  @Authorization(value = {IdentityEnums.SUPER_ADMIN})
  @DeleteMapping(value = "/delete")
  public String delete(@RequestParam("name") String name) {
    userServiceImpl.delete(name);
    return "删除成功";
  }

  @RequestMapping(
      value = "/update",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String update(@RequestBody User user) {
    userServiceImpl.update(user.getName(), user.getPassword()); // 默认更新成功，后面有需求再改。
    return "更新成功";
  }

  public int analyseData(Map<String, String> body) {

    List<String> data = new ArrayList<>();

    body.forEach(
        (k, v) -> {
          String dataArray[] = k.toString().split(","); // 先是用 ， 隔开各个数据组
          for (String s : dataArray) {
            data.add(s.split("\"")[3]);
          }
        });

    userServiceImpl.register(data.get(0), data.get(1)); //将用户名和密码存到user表中

    User user = userServiceImpl.getUserByName(data.get(0)); //先获取刚才存到user中的记录的id，然后根据data构造information保存到information表
    Information information = new Information();
    information.setUserid(user.getId());
    information.setUsername(data.get(0));
    information.setEmail(data.get(3));
    information.setGithubpage(data.get(4));
    information.setHomepage(data.get(5));
    information.setSelfintroduction(data.get(6));
    information.setPhotourl(data.get(7)); // 因为最后一个字符串 还含有一个大括号}

    settingsService.update(information);

    return user.getId();
  }
}
