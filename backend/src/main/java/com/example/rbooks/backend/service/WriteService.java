package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;

public interface WriteService {

  // 需要 BookDao 和ChapterDao  协同工作。  addBook   addChapter deleteChapter updateChapter
  int addBook(Book book);//需要返回一个BookId，好让接下来的Chapter可以正常工作，不然添加chapter时找不到 id

  int deleteBook(int id); //删除成功返回 1 失败-1

  int updateBook(Book book);

  int addChapter(Chapter chapter); //返回-1代表失败，1成功

  int deleteChapter(ChapterId chapterId);

  int updateChapter(Chapter chapter);
}
