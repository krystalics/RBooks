package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.service.WriteService;
import com.example.rbooks.backend.serviceImpl.WriteServiceImpl;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/write")
public class WriteController {

  @Autowired
  private WriteService writeServiceImpl;

  @RequestMapping(value = "/addbook", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public int addBook(@RequestBody Book book) {
    return writeServiceImpl.addBook(book);
  }

  @RequestMapping(value = "/deletebook", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
  public String deleteBook(@RequestBody Map<String,Integer> id_map) {
    int success = writeServiceImpl.deleteBook(id_map.get("id")); //成功的话返回1,,不过是默认成功的，，
    if (success == 1) {
      return "删除成功";
    }
    return "没有这本书";
  }

  @RequestMapping(value = "/updatebook", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public String updateBook(@RequestBody Book book){  //更新时需要用到 id  谨记
    int success=writeServiceImpl.updateBook(book);
    if(success==1){
      return "更新成功";
    }
    return "失败";
  }

  @RequestMapping(value = "/addchapter", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public int addChapter(@RequestBody Chapter chapter) { //格式因为复合主键，需要增加一层
    /*
                       {
                        "chapterId":{
                          "bookid":1,
                          "chaptername":"第一章"
                         },
                        "content":"该内容"
                       }
    * */
    return writeServiceImpl.addChapter(chapter);
  }

  @RequestMapping(value = "/deletechapter", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
  public String deleteChapter(@RequestBody ChapterId chapterId) {
    int success = writeServiceImpl.deleteChapter(chapterId); //成功的话返回1,,不过是默认成功的，，
    if (success == 1) {
      return "删除成功";
    }
    return "没有这本书";
  }

  @RequestMapping(value = "/updatechapter", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public String updateChapter(@RequestBody Chapter chapter){
    int success=writeServiceImpl.updateChapter(chapter);
    if(success==1){
      return "更新成功";
    }
    return "失败";
  }


}
