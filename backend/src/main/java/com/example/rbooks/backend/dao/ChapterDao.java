package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import java.util.List;

public interface ChapterDao {

  void addChapter(Chapter chapter); //存储章节内容

  void deleteChapter(ChapterId chapterId); //删除本章，会导致本章的discuss也删除掉，数据库有关联了，这边知道就可以

  void updateChapter(Chapter chapter);

  Chapter getChapter(ChapterId chapterId); // 读取章节内容

  List<Chapter> getBook(int bookid);
}
