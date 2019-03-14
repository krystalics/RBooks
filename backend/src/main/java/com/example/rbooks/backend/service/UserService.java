package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.User;
import java.util.List;

public interface UserService {
  void save(User user);
  void delete(int id);
  List<User> getAll();
}
