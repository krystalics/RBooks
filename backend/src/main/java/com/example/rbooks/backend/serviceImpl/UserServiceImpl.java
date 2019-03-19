package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.UserDao;
import com.example.rbooks.backend.daoImpl.UserDaoImpl;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service  //注解为 Service层
public class UserServiceImpl implements UserService {

  @Autowired
  private UserDao userDaoImpl;


  @Override
  public int register(User user) {
    User user1=userDaoImpl.getUser(user.getName()); //在表中寻找这个用户名
    if(user1!=null){//说明用户名已存在
      return -1;
    }
    return userDaoImpl.addUser(user); //若不存在，则返回其存进表中后的id
  }

  @Override
  public int delete(String name) {
    if(userDaoImpl.getUser(name)==null){
      return -1;  //说明该用户不存在
    }
    userDaoImpl.deleteUser(name);
    return 1; //正常删除
  }

  @Override
  public int update(User user) {
    User user1=userDaoImpl.getUser(user.getName());
    if(user1==null){
      return -1;  //说明该用户不存在
    }
    user.setId(user1.getId()); //因为传进来的user可能并没有包含 id ，更新时会增加一个记录 ，设置id的话就是更新了
    userDaoImpl.updateUser(user);
    return 1;
  }

  @Override
  public int login(User user) {
    String name = user.getName();
    String password = user.getPassword();
    User user1 = userDaoImpl.getUser(name); //从表中数据 找到该用户
    if (user1 != null && password.equals(user1.getPassword())) {// 如果密码相同的话
      return user1.getId(); //返回id
    }

    return -1; //说明表中没有该用户 或者密码错误
  }


}
