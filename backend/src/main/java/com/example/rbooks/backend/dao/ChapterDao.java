package com.example.rbooks.backend.dao;

public interface ChapterDao {

  void storeChapter(String content); //存储章节内容

  void deleteChapter(); //删除本章，会导致本章的discuss也删除掉，数据库有关联了，这边知道就可以

  void updateChapter();

  String readChapter(); // 读取章节内容



}
