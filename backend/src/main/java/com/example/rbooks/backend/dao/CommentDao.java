package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;

public interface CommentDao {

  void addComment(Comment comment);

  void deleteComment(ChapterId chapterId);

  Comment getComment(ChapterId chapterId);

}
