package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer> {
  User findByName(String name);
}
