package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface ChapterRepository extends CrudRepository<Chapter, Integer> {

   Chapter findByChapterid(ChapterId chapterId);
   void deleteByChapterid(ChapterId chapterId);

}
