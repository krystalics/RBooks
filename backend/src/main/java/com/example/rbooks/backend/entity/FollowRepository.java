package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface FollowRepository extends CrudRepository<Follow, Integer> {

  void deleteByUseridAndFAndFollowauthorid(int userId,int authorId);

  void deleteByUseridAndAndFollowbookid(int userId,int bookId);

  Follow findByUserid(int userId);
}
