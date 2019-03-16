package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface ChapterRepository extends CrudRepository<Chapter, Integer> {

   Chapter findByChapterId(ChapterId chapterId);
   void deleteByChapterId(ChapterId chapterId);

}
