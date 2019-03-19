package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Comment;
import java.util.List;

public interface MessageService {

  List<Comment> getComments(String commentuser); //这个接口用于 Message服务
}
