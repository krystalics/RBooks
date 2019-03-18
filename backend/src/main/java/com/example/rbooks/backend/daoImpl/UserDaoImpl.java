package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.UserDao;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserDaoImpl implements UserDao {

  private final UserRepository userRepository;

  @Autowired
  public UserDaoImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public int addUser(User user) {
    // 进入这一层的方法，说明表中没有该用户名
    userRepository.save(user); //存进表中之后，id会是表中自增的那个数
    User user1 = userRepository.findByName(user.getName());
    return user1.getId();
  }

  @Transactional  //删除操作必须是原子的，不然会报错
  @Override
  public void deleteUser(String name) {
    userRepository.deleteByName(name);
  }

  @Override
  public void updateUser(User user) {
    userRepository.save(user);
  }

  @Override
  public User getUser(String name) {
    return userRepository.findByName(name);
  }

  @Override
  public User getUser(int id){
    return userRepository.findById(id);
  }
}
