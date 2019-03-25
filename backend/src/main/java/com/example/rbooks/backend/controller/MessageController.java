package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.service.MessageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

  private final MessageService messageServiceImpl;

  @Autowired
  public MessageController(MessageService messageServiceImpl) {
    this.messageServiceImpl = messageServiceImpl;
  }

  @RequestMapping(value = "/message")
  public List<Comment> getMessages(@RequestParam String commentuser) {
    return messageServiceImpl.getComments(commentuser);
  }
}
