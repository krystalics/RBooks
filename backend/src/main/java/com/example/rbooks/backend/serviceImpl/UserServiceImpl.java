package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.entity.UserRepository;
import com.example.rbooks.backend.service.UserService;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service  //注解为 Service层
public class UserServiceImpl implements UserService {

  @Autowired  //自动捕获 Bean
  private UserRepository userRepository;


  /**
   * save,update,delete方法需要绑定事务 使用@Transactional进行事务绑定
   */

  @Transactional
  @Override
  public void save(User user) {
    userRepository.save(user);
  }

  @Transactional
  @Override
  public void delete(int id) {
    userRepository.deleteById(id);
  }

  @Override
  public List<User> getAll() {
    /*
    * 注意  Iterable和 Iterator的区别，和用法
    * */
    Iterable<User> users=userRepository.findAll();
    Iterator<User> iter=users.iterator();
    List<User> res=new ArrayList<>();
    while (iter.hasNext()){
      res.add(iter.next());
    }

    return res;
  }
}
