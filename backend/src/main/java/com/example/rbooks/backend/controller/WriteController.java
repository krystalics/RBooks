package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.auth.Authorization;
import com.example.rbooks.backend.auth.IdentityEnums;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.service.MyPageService;
import com.example.rbooks.backend.service.ReadService;
import com.example.rbooks.backend.service.WriteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/write")
@Authorization(value = {IdentityEnums.VISITOR,IdentityEnums.ADMIN,IdentityEnums.SUPER_ADMIN})
public class WriteController {

  @Autowired
  private ReadService readService;

  private final WriteService writeServiceImpl;
  @Autowired
  private MyPageService myPageServiceImpl;
  @Autowired
  public WriteController(WriteService writeServiceImpl) {
    this.writeServiceImpl = writeServiceImpl;
  }
  @RequestMapping("/getwrite")
  public List<Book> getWrites(@RequestParam String author) {
    return myPageServiceImpl.getBooks_write(author);
  }

  @RequestMapping("/getallchapters")
  public List<Chapter> getAllChapters(@RequestParam int bookid) {
    return writeServiceImpl.getAllChapters(bookid);
  }

  @RequestMapping(value = "/addbook", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public int addBook(@RequestBody Book book) { //需要返回ID
    return writeServiceImpl.addBook(book);
  }

  @RequestMapping(value = "/deletebook")
  public String deleteBook(@RequestParam int bookid) {
    writeServiceImpl.deleteBook(bookid); //成功的话返回1,,不过是默认成功的，，

    return "删除成功";
  }

  @RequestMapping(value = "/updatebook", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String updateBook(@RequestBody Book book) {  //更新时需要用到 id  谨记
    writeServiceImpl.updateBook(book);

    return "更新成功";
  }

  @RequestMapping(value = "/addchapter", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String addChapter(@RequestBody Chapter chapter) { //格式因为复合主键，需要增加一层
    writeServiceImpl.addChapter(chapter);
    return "保存成功";
  }



  @RequestMapping(value = "/updatechapter", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String updateChapter(@RequestBody Chapter chapter) {

    Chapter chapter1=readService.getChapter(chapter.getChapterid());
    chapter1.setUpdatetime(chapter.getUpdatetime());
    chapter1.setContent(chapter.getContent());
    writeServiceImpl.updateChapter(chapter1);

    return "更新成功";
  }

  @RequestMapping(value = "/deletechapter", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String deleteChapter(@RequestBody ChapterId chapterId) {
    writeServiceImpl.deleteChapter(chapterId);
    return "删除成功";
  }


}
