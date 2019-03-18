package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.CommentDao;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentRepository;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CommentDaoImpl implements CommentDao {

  private final CommentRepository commentRepository;

  @Autowired
  public CommentDaoImpl(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }


  @Override
  public void addComment(Comment comment) {
    commentRepository.save(comment);
  }

  @Override
  public List<Comment> getCommentsByChapterId(ChapterId chapterId) {
    return commentRepository.findByChapterId(chapterId);
  }

  @Override
  public List<Comment> getCommentsByUserName(String commentuser) {
    return commentRepository.findByCommentuser(commentuser);
  }


}
