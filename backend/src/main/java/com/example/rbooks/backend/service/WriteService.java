package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import java.util.List;

public interface WriteService {

  // 需要 BookDao 和ChapterDao  协同工作。  addBook   addChapter deleteChapter updateChapter
  int addBook(Book book);//需要返回一个BookId，好让接下来的Chapter可以正常工作，不然添加chapter时找不到 id

  void deleteBook(int id); //删除成功返回 1 失败-1

  void updateBook(Book book);

  void addChapter(Chapter chapter); //返回-1代表失败，1成功

  void deleteChapter(ChapterId chapterId);

  void updateChapter(Chapter chapter);

  List<Chapter> getAllChapters(int bookid);
}
