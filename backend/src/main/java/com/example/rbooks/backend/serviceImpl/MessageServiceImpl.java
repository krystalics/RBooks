package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.CommentDao;
import com.example.rbooks.backend.daoImpl.CommentDaoImpl;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.service.MessageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
  将被注解的类 注册到 Spring的容器中。使之能够 被自动注入 Bean，管理
* @Component 没有明确角色的组件
  @Service 在业务逻辑层（Service层）使用
  @Repositpry 在数据访问层（dao层）使用
  @Controller 用于标注控制层组件
  @RestController
* */

@Service
public class MessageServiceImpl implements MessageService {

  @Autowired
  private CommentDao commentDaoImpl;

  @Override
  public List<Comment> getComments(String commentuser) {
    return commentDaoImpl.getCommentsByUserName(commentuser);
  }
}
