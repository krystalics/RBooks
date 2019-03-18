package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.User;

public interface UserDao {

  // 对User表的 数据处理的接口

  int addUser(User user); //返回添加是否成功的信息  -1 表示失败，其他的表示该用户的id

  void deleteUser(String name); //会影响到其他表的数据，不过数据库的表之间已经建立起了关联，所以不需要再代码层面继续写了。

  void updateUser(User user);

  User getUser(String name);

  User getUser(int id);
}
