package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentId;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowbookId;
import java.util.List;

public interface ReadService {

  // 本服务由 CommentDao ChapterDao协助完成 chapter在这里只能读，  删除和更新以及写要在writeService中
  // 不提供删除与更改 评论服务
  List<Comment> getComments(ChapterId chapterId);

  List<Comment> getComments(int bookid);

  void deleteComment(CommentId commentId);

  Chapter getChapter(ChapterId chapterId);

  void addComment(Comment comment);

  void addFollowAuthor(FollowauthorId id);

  void deleteFollowAuthor(FollowauthorId id);

  void addFollowBook(FollowbookId id);

  void deleteFollowBook(FollowbookId id);

  List<Chapter> getBook(int bookid);

  Book getBookById(int bookid);

}
