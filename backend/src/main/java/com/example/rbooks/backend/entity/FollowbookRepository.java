package com.example.rbooks.backend.entity;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface FollowbookRepository extends CrudRepository<Followbook,Integer> {

  Boolean existsByFollowbookid(FollowbookId id);

  void deleteByFollowbookid(FollowbookId id);
}
