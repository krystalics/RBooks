package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.dao.ChapterDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.service.WriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WriteServiceImpl implements WriteService {

  @Autowired
  private BookDao bookDaoImpl;
  @Autowired
  private ChapterDao chapterDaoImpl;

  @Override
  public int addBook(Book book) { //需要返回 bookid
    bookDaoImpl.addBook(book);//先入库,入库之后找到它自增的id
    return bookDaoImpl.getBookByNameAndAuthor(book.getName(), book.getAuthor()).getId();
  }

  @Override
  public int deleteBook(int id) {

    bookDaoImpl.deleteBook(id);

    return 1; //默认可以删除成功
  }

  @Override
  public int updateBook(Book book) {
    bookDaoImpl.updateBook(book);
    return 1;
  }

  @Override
  public int addChapter(Chapter chapter) {
    chapterDaoImpl.addChapter(chapter);
    return 1;
  }

  @Override
  public int deleteChapter(ChapterId chapterId) {
    chapterDaoImpl.deleteChapter(chapterId);
    return 1;
  }

  @Override
  public int updateChapter(Chapter chapter) {
    chapterDaoImpl.updateChapter(chapter);
    return 1;
  }
}
