package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.User;

public interface UserDao {

  // 对User表的 数据处理的接口

  void addUser(User user);

  void deleteUser(int id); //会影响到其他表的数据，不过数据库的表之间已经建立起了关联，所以不需要再代码层面继续写了。

  void updateUser(User user);

  User getUser(String name);


}
