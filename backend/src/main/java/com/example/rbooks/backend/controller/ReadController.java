package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.BookRepository;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.ChapterRepository;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentId;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowbookId;
import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.service.MyPageService;
import com.example.rbooks.backend.service.ReadService;
import com.example.rbooks.backend.service.UserService;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/read")

public class ReadController {

  @Autowired private UserService userServiceImpl;
  // ReadService 只提供，获取 评论，获取章节内容，增加评论的服务
  @Autowired private BookRepository bookRepository;

  @Autowired private ChapterRepository chapterRepository;

  private final ReadService readServiceImpl;

  private final MyPageService myPageServiceImpl;

  //  @Autowired
  //  private

  @Autowired
  public ReadController(ReadService readServiceImpl, MyPageService myPageServiceImpl) {
    this.readServiceImpl = readServiceImpl;
    this.myPageServiceImpl = myPageServiceImpl;
  }

  // 试过了 自增的id 是接着从user表中的id 开始的，并不是单独的表有单独的记录....如果作者不在数据库中，就会报错，，因为有外键约束
  @RequestMapping(
      value = "/addcomment",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public String addComment(@RequestBody Comment comment) { // 没加RequestBody 会导致数据为null

    readServiceImpl.addComment(comment);

    return "添加成功"; // 默认可以添加成功
  }

  @RequestMapping(
      value = "/deletecomment",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public String deleteComment(@RequestBody CommentId commentId) {
    readServiceImpl.deleteComment(commentId);
    return "删除成功";
  }

  @RequestMapping(value = "/getdirectory")
  public List<String> getDirectory(@RequestParam int bookid) { // 数据格式 {bookid:1,chaptername:"第一章"}
    List<Chapter> books = readServiceImpl.getBook(bookid); // 测试成功，所以不用在打印了

    List<String> directory = new ArrayList<>();
    for (Chapter chapter : books) {
      // 加时间是为了前端方便按时间排序
      String item =
          chapter.getCreatetime().toString() + "~" + chapter.getChapterid().getChaptername();
      directory.add(item);
    }
    return directory;
  }

  @RequestMapping(
      value = "/getchapter",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public Chapter getChapter(@RequestBody ChapterId chapterId) {
    return readServiceImpl.getChapter(chapterId);
  }

  @RequestMapping(
      value = "/getcomments",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public List<Comment> getComments(@RequestBody ChapterId chapterId) {

    return readServiceImpl.getComments(chapterId);
  }

  @RequestMapping(value = "/getAllcomments")
  public List<Comment> getComments(@RequestParam int bookid) {

    return readServiceImpl.getComments(bookid);
  }

  @RequestMapping(value = "/isfollowauthor")
  public Boolean isFollowAuthor(@RequestParam int userid, @RequestParam String authorname) {

    FollowauthorId id = genFollowAuthorId(userid, authorname);

    return myPageServiceImpl.isFollowAuthor(id);
  }

  @RequestMapping(
      value = "/isfollowbook",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public Boolean isFollowBook(@RequestBody FollowbookId id) {
    return myPageServiceImpl.isFollowBook(id);
  }

  @RequestMapping(value = "/addfollowauthor")
  public String addFollowAuthor(@RequestParam int userid, @RequestParam String authorname) {
    FollowauthorId id = genFollowAuthorId(userid, authorname);

    readServiceImpl.addFollowAuthor(id);

    return "添加成功";
  }

  @RequestMapping(value = "/deletefollowauthor")
  public String deleteFollowAuthor(@RequestParam int userid, @RequestParam String authorname) {
    FollowauthorId id = genFollowAuthorId(userid, authorname);

    readServiceImpl.deleteFollowAuthor(id);
    return "删除成功";
  }

  @RequestMapping(
      value = "/addfollowbook",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public String LoveChapter(@RequestBody FollowbookId id) {
    // 点赞将记录点赞用户还需要将 chapter和book中的love 都 ++ 一遍
    readServiceImpl.addLoveChapter(id);
    loveChapter(id, true);
    return "添加成功";
  }

  @RequestMapping(
      value = "/deletefollowbook",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public String deleteLoveChapter(@RequestBody FollowbookId id) {
    readServiceImpl.deleteLoveChapter(id);
    loveChapter(id, false);
    return "删除成功";
  }

  public void loveChapter(FollowbookId id, boolean add) {

    Book book = bookRepository.findById(id.getBookid());

    synchronized (this){  //因为很可能多个人同时点赞，所以需要 线程安全
      int love = book.getLove();
      if (add) {
        love++;
      } else {
        love--;
      }
      book.setLove(love);
      bookRepository.save(book);
    }

    ChapterId chapterId = new ChapterId();
    chapterId.setChaptername(id.getChaptername());
    chapterId.setBookid(id.getBookid());
    Chapter chapter = readServiceImpl.getChapter(chapterId);
    AtomicInteger love2 = chapter.getLove();
    if (add) {
      love2.incrementAndGet(); // 相当于 love++
    } else {
      love2.decrementAndGet(); // 相当于 love--
    }

    chapter.setLove(love2);
    chapterRepository.save(chapter);
  }

  public FollowauthorId genFollowAuthorId(int userid, String authorname) {
    User user = userServiceImpl.getUserByName(authorname);
    FollowauthorId id = new FollowauthorId();
    id.setUserid(userid);
    id.setAuthorid(user.getId());
    return id;
  }
}
