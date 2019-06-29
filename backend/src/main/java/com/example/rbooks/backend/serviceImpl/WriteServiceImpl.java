package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.dao.ChapterDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.service.WriteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WriteServiceImpl implements WriteService {

  @Autowired private BookDao bookDao;
  @Autowired private ChapterDao chapterDao;

  @Override
  public int addBook(Book book) { // 需要返回 bookid

    bookDao.addBook(book); // 先入库,入库之后找到它自增的id
    // 新增书籍的时候 把简介直接加进文章里
    int id = bookDao.getBookByNameAndAuthor(book.getName(), book.getAuthor()).getId();
    ChapterId chapterId = new ChapterId();
    chapterId.setBookid(id);
    chapterId.setChaptername("序言");
    Chapter chapter = new Chapter();
    chapter.setChapterid(chapterId);
    chapter.setContent(book.getDescription());
    chapter.setCreatetime(book.getDatetime());
    chapter.setUpdatetime(book.getDatetime());
    chapterDao.addChapter(chapter);
    return bookDao.getBookByNameAndAuthor(book.getName(), book.getAuthor()).getId();
  }

  @Override
  public void deleteBook(int id) {
    bookDao.deleteBook(id);
  }

  @Override
  public void updateBook(Book book) {
    bookDao.updateBook(book);
  }

  @Override
  public void addChapter(Chapter chapter) {
    chapterDao.addChapter(chapter);
  }

  @Override
  public void deleteChapter(ChapterId chapterId) {
    chapterDao.deleteChapter(chapterId);
  }

  @Override
  public void updateChapter(Chapter chapter) {
    chapterDao.updateChapter(chapter);
  }

  @Override
  public List<Chapter> getAllChapters(int bookid) {
    // 将content设为空，因为前端路由传参一直出错。所以更改后端的东西，希望快点。所以将暂时没用的content设为空
    List<Chapter> chapters = chapterDao.getAllChapters(bookid);
    for(Chapter chapter:chapters){
      chapter.setContent("");
    }
    return chapters;
  }
}
