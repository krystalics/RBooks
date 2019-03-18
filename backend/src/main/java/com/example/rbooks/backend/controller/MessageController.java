package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.daoImpl.CommentDaoImpl;
import com.example.rbooks.backend.entity.Comment;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

//  @Autowired
//  private CommentDaoImpl commentDaoImpl;
//
//  @RequestMapping("/message")
//  public List<Comment> getMessages(@RequestBody String commentuser) {
//    return commentDaoImpl.getCommentsByUsername(commentuser);
//  }
}
