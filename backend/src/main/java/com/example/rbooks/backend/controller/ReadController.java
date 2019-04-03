package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowbookId;
import com.example.rbooks.backend.service.ReadService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
* 被@Controller标注的类负责处理由DispatcherServlet分发的请求，
* 它把用户请求的数据经过业务处理层处理之后封装成一个Model ，
* 然后再把该Model返回给对应的View进行展示
*
* @ResponseBody注解支持将返回值放在response体内，而不是返回一个视图
  @ResponseBody注解直接将返回的对象输出到客户端
  如果返回字符串，直接返回
  如果返回不是字符串，默认使用Jackson将对象序列化成JSON字符串后输出

  @RestController是一个组合注解
  @RestController = @Controller + @ResponseBody
  @RestController注解直接将返回的对象输出到客户端
* */
@RestController
@RequestMapping("/read")
public class ReadController {

  // ReadService 只提供，获取 评论，获取章节内容，增加评论的服务
  private final ReadService readServiceImpl;

  @Autowired
  public ReadController(ReadService readServiceImpl) {
    this.readServiceImpl = readServiceImpl;
  }


  // 试过了 自增的id 是接着从user表中的id 开始的，并不是单独的表有单独的记录....如果作者不在数据库中，就会报错，，因为有外键约束
  @RequestMapping(value = "/addcomment", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String addComment(@RequestBody Comment comment) { //没加RequestBody 会导致数据为null

    readServiceImpl.addComment(comment);

    return "添加成功"; //默认可以添加成功
  }

//  @RequestMapping(value = "/getcontent", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//  public String content(@RequestBody ChapterId chapterId) { //数据格式 {bookid:1,chaptername:"第一章"}
//    return readServiceImpl.getContent(chapterId);
//  }

  @RequestMapping(value = "/getdirectory")
  public List<String> getBook(@RequestParam int bookid) { //数据格式 {bookid:1,chaptername:"第一章"}
    List<Chapter> books = readServiceImpl.getBook(bookid);  //测试成功，所以不用在打印了
//    for(Chapter chapter:books){
//      System.out.println(chapter.getChapterid());
//      System.out.println(chapter.getDatetime());
//      System.out.println(chapter.getContent());
//    }
    //直接获得整本书的内容，前端耦合程度太高了
    List<String> directory=new ArrayList<>();
    for(Chapter chapter:books){
      directory.add(chapter.getChapterid().getChaptername());
    }
    return directory;
  }

  @RequestMapping(value = "/getchapter", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Chapter getChapter(@RequestBody ChapterId chapterId) {
//    System.out.println(chapterId.getBookid()+chapterId.getChaptername());
    return readServiceImpl.getChapter(chapterId);
  }

  @RequestMapping(value = "/getcomments", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public List<Comment> getComments(@RequestBody ChapterId chapterId) {

//    System.out.println(chapterId.getBookid()+chapterId.getChaptername());
    return readServiceImpl.getComments(chapterId);
  }

  @RequestMapping(value = "/getAllcomments")
  public List<Comment> getComments(@RequestParam int bookid) {
    // 获得整本书的评论，
//    List<Comment> comments=readServiceImpl.getComments(bookid);
//    for(Comment comment:comments){
//      System.out.println(comment.getChapterid().getBookid());
//      System.out.println(comment.getChapterid().getChaptername());
//      System.out.println(comment.getCommentuser());
//      System.out.println(comment.getDatetime());
//      System.out.println(comment.getContent());
//    }
    return readServiceImpl.getComments(bookid);
  }

  @RequestMapping(value = "/addfollowauthor", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String addFollowAuthor(@RequestBody FollowauthorId id) {
    readServiceImpl.addFollowAuthor(id);

    return "添加成功";
  }

  @RequestMapping(value = "/deletefollowauthor", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String deleteFollowAuthor(@RequestBody FollowauthorId id) {
    readServiceImpl.deleteFollowAuthor(id);

    return "删除成功";
  }

  @RequestMapping(value = "/addfollowbook", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String addFollowBook(@RequestBody FollowbookId id) {
    readServiceImpl.addFollowBook(id);

    return "添加成功";
  }

  @RequestMapping(value = "/deletefollowbook", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String deleteFollowBook(@RequestBody FollowbookId id) {
    readServiceImpl.deleteFollowBook(id);

    return "删除成功";
  }

}
