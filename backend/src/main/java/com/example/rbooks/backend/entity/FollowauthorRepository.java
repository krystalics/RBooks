package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface FollowauthorRepository extends CrudRepository<Followauthor,Integer> {

  void deleteByFollowauthorid(FollowauthorId id);
  Boolean existsByFollowauthorid(FollowauthorId id);
}
