package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.CommentDao;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentRepository;
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
  public void deleteComment(ChapterId chapterId) { //前端会传过来Chapter ，到时候分解得到ChapterId
    commentRepository.deleteByChapterId(chapterId);
  }

  @Override
  public Comment getComment(ChapterId chapterId) {
    return commentRepository.findByChapterId(chapterId);
  }
}
