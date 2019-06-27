package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.ChapterDao;
import com.example.rbooks.backend.dao.CommentDao;
import com.example.rbooks.backend.dao.FollowDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentId;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowbookId;
import com.example.rbooks.backend.service.ReadService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReadServiceImpl implements ReadService {

  private final ChapterDao chapterDaoImpl;

  private final CommentDao commentDaoImpl;



  @Autowired
  private FollowDao followDaoImpl;

  @Autowired
  public ReadServiceImpl(ChapterDao chapterDaoImpl, CommentDao commentDaoImpl) {
    this.chapterDaoImpl = chapterDaoImpl;
    this.commentDaoImpl = commentDaoImpl;
  }

  @Override
  public List<Comment> getComments(ChapterId chapterId) {
    return commentDaoImpl.getCommentsByChapterId(chapterId);
  }

  @Override
  public List<Comment> getComments(int bookid) {
    return commentDaoImpl.getCommentsByBookid(bookid);
  }

  @Override
  public void deleteComment(CommentId commentId) {
    commentDaoImpl.deleteComment(commentId);
  }


  @Override
  public Chapter getChapter(ChapterId chapterId) {
    return chapterDaoImpl.getChapter(chapterId);
  }

  @Override
  public void addComment(Comment comment) {
    commentDaoImpl.addComment(comment);

  }

  @Override
  public void addFollowAuthor(FollowauthorId id) {
    followDaoImpl.addFollowAuthor(id);
  }

  @Override
  public void deleteFollowAuthor(FollowauthorId id) {
    followDaoImpl.deleteFollowAuthor(id);
  }

  @Override
  public void addFollowBook(FollowbookId id) {
    followDaoImpl.addFollowBook(id);
  }

  @Override
  public void deleteFollowBook(FollowbookId id) {
    followDaoImpl.deleteFollowBook(id);
  }

  @Override
  public List<Chapter> getBook(int bookid) {
    return chapterDaoImpl.getBook(bookid);
  }


}
