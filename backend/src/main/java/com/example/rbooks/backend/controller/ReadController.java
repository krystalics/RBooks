package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.daoImpl.BookDaoImpl;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.serviceImpl.ReadServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
  @Autowired
  private ReadServiceImpl readServiceImpl;


  // 试过了 自增的id 是接着从user表中的id 开始的，并不是单独的表有单独的记录....如果作者不在数据库中，就会报错，，因为有外键约束
  @RequestMapping(value = "/addcomment", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public int addComment(@RequestBody Comment comment) { //没加RequestBody 会导致数据为null

    readServiceImpl.add(comment);
    return 1; //默认可以添加成功
  }

  @RequestMapping(value = "/getcontent", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public String content(@RequestBody ChapterId chapterId) { //数据格式 {bookid:1,chaptername:"第一章"}
    return readServiceImpl.getContent(chapterId);
  }

  @RequestMapping(value = "/getcomments", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Comment> getComments(@RequestBody ChapterId chapterId) {
    return readServiceImpl.getComments(chapterId);
  }


}
