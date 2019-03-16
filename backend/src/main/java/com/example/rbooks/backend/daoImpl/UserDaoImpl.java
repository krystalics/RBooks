package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.UserDao;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {

  private final UserRepository userRepository;

  @Autowired
  public UserDaoImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public void addUser(User user) {
    userRepository.save(user);
  }

  @Override
  public void deleteUser(int id) {
    userRepository.deleteById(id);
  }

  @Override
  public void updateUser(User user) {
    userRepository.save(user);

  }

  @Override
  public User getUser(String name) {
    return userRepository.findByName(name);
  }
}
