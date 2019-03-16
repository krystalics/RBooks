package com.example.rbooks.backend.dao;

public interface UserDao {

  // 对User表的 数据处理的接口
  int getId();

  void addUser();

  void deleteUser(); //会影响到其他表的数据，不过数据库的表之间已经建立起了关联，所以不需要再代码层面继续写了。

  void updateUser();

  String getUserInfO();


}
