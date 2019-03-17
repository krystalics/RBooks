package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface FollowRepository extends CrudRepository<Follow, Integer> {

  void deleteByUseridAndFollowauthorid(int userId,int authorId);

  void deleteByUseridAndFollowbookid(int userId,int bookId);

  Follow findByUserid(int userId);
}
