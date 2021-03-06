package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.InformationDao;
import com.example.rbooks.backend.dao.UserDao;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service  //注解为 Service层
public class UserServiceImpl implements UserService {

  @Autowired
  private UserDao userDaoImpl;
  @Autowired
  private InformationDao informationDaoImpl;

  @Override
  public int register(String name, String password) {
    User user = userDaoImpl.getUserByName(name); //在表中寻找这个用户名

    if (user != null) {//说明用户名已存在
      return -1;
    }
    user = new User(); // 如果不存在则新建一个
    user.setName(name);
    user.setPassword(password);
    int id = userDaoImpl.addUser(user); //若不存在，则返回其存进表中后的id
    // 注册初期就将 账号存储进information中。
    Information information=new Information();
    information.setUserid(id);
    information.setUsername(user.getName());
    informationDaoImpl.updateInformation(information);
    return id;
  }

  @Override
  public void delete(String name) {
    if (userDaoImpl.getUserByName(name) == null) {
      return;  //说明该用户不存在
    }
    userDaoImpl.deleteUser(name);

  }

  @Override
  public void update(String name, String password) {
    User user = userDaoImpl.getUserByName(name);
    if (user == null) {
      return;  //说明该用户不存在
    }

    userDaoImpl.updateUser(user);

  }

  @Override
  public int login(String name, String password) {
//    System.out.println(user.getName()+user.getPassword());

    User user = userDaoImpl.getUserByName(name); //从表中数据 找到该用户
    if (user != null && user.getPassword().equals(password)) {// 如果密码相同的话
      return user.getId(); //返回id
    }

    return -1; //说明表中没有该用户 或者密码错误
  }

  @Override
  public User getUserByName(String name) {
    return userDaoImpl.getUserByName(name);
  }


}
