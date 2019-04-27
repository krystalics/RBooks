package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentId;
import java.util.List;

public interface CommentDao {

  void addComment(Comment comment);

  List<Comment> getCommentsByChapterId(ChapterId chapterId);

  List<Comment> getCommentsByBookid(int bookid);

  List<Comment> getCommentsByUserName(String commentuser);

  void deleteComment(CommentId commentId);
}
