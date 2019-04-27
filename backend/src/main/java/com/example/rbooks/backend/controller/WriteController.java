package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.service.MyPageService;
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
public class WriteController {

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
    /*
       {
        "chapterId":{
          "bookid":1,
          "chaptername":"第一章"
         },
        "content":"该内容"
       }
    * */
    writeServiceImpl.addChapter(chapter);
    return "保存成功";
  }



  @RequestMapping(value = "/updatechapter", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String updateChapter(@RequestParam String oldName,@RequestBody Chapter chapter) {
    ChapterId chapterId=new ChapterId();
    chapterId.setBookid(chapter.getChapterid().getBookid());
    chapterId.setChaptername(oldName);
    writeServiceImpl.deleteChapter(chapterId); //更新的时候，要先把原来的删除掉

    writeServiceImpl.updateChapter(chapter);

    return "更新成功";
  }


}
