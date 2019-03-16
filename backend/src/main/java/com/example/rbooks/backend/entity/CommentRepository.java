package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

  void deleteByChapterId(ChapterId chapterId);

  Comment findByChapterId(ChapterId chapterId);
}
