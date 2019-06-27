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
    // 新增书籍的时候 把简介直接加进文章里
    int id=bookDaoImpl.getBookByNameAndAuthor(book.getName(), book.getAuthor()).getId();
    ChapterId chapterId=new ChapterId();
    chapterId.setBookid(id);
    chapterId.setChaptername("序言");
    Chapter chapter=new Chapter();
    chapter.setChapterid(chapterId);
    chapter.setContent(book.getDescription());
    chapter.setCreatetime(book.getDatetime());
    chapter.setUpdatetime(book.getDatetime());
    chapterDaoImpl.addChapter(chapter);
    return bookDaoImpl.getBookByNameAndAuthor(book.getName(), book.getAuthor()).getId();
  }

  @Override
  public void deleteBook(int id) {

    bookDaoImpl.deleteBook(id);

  }

  @Override
  public void updateBook(Book book) {
    bookDaoImpl.updateBook(book);

  }

  @Override
  public void addChapter(Chapter chapter) {
    chapterDaoImpl.addChapter(chapter);

  }

  @Override
  public void deleteChapter(ChapterId chapterId) {
    chapterDaoImpl.deleteChapter(chapterId);

  }

  @Override
  public void updateChapter(Chapter chapter) {
    chapterDaoImpl.updateChapter(chapter);

  }
}
