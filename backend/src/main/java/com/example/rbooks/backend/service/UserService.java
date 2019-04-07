package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.User;
import java.util.List;

public interface UserService {

  // 这个接口只需要 做好 User的CRUD就好了
  int register(String name,String password); //返回user id，

  void delete(String name); //这是管理员权限，

  void update(String name,String password); //实际上只能修改password

  int login(String name,String password); //成功就返回 user id  失败返回-1

  User getUserByName(String name);

}
