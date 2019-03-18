package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.daoImpl.ChapterDaoImpl;
import com.example.rbooks.backend.daoImpl.CommentDaoImpl;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.service.ReadService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReadServiceImpl implements ReadService {

  private final ChapterDaoImpl chapterDaoImpl;

  private final CommentDaoImpl commentDaoImpl;

  @Autowired
  public ReadServiceImpl(ChapterDaoImpl chapterDaoImpl, CommentDaoImpl commentDaoImpl) {
    this.chapterDaoImpl = chapterDaoImpl;
    this.commentDaoImpl = commentDaoImpl;
  }

  @Override
  public List<Comment> getComments(ChapterId chapterId) {

    return commentDaoImpl.getCommentsByChapterId(chapterId);
  }

  @Override
  public List<Comment> getComments(String commentuser) {

    return commentDaoImpl.getCommentsByUserName(commentuser);
  }

  @Override
  public String getContent(ChapterId chapterId) {
    return chapterDaoImpl.getChapter(chapterId).getContent();
  }

  @Override
  public int add(Comment comment) {
    commentDaoImpl.addComment(comment);
    return 1; //默认添加成功，
  }
}
