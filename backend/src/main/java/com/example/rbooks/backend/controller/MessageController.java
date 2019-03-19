package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.service.MessageService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

  private final MessageService messageServiceImpl;

  @Autowired
  public MessageController(MessageService messageServiceImpl) {
    this.messageServiceImpl = messageServiceImpl;
  }

  @RequestMapping(value = "/message",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Comment> getMessages(@RequestBody Map<String,String> commentuser) {
    return messageServiceImpl.getComments(commentuser.get("username"));
  }
}
