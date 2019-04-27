package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.CommentDao;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.CommentId;
import com.example.rbooks.backend.entity.CommentRepository;
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

  //这里变成了更新，而且返回前端的消息也只有一条,之前只能更新时因为主键选择错误，变更了主键之后就可以了
  @Override
  public void addComment(Comment comment) {
    commentRepository.save(comment);
  }

  @Override
  public List<Comment> getCommentsByChapterId(ChapterId chapterId) {
    return commentRepository.findByCommentid_BookidAndCommentid_Chaptername(chapterId.getBookid(),
        chapterId.getChaptername());
  }

  @Override
  public List<Comment> getCommentsByBookid(int bookid) {
    return commentRepository.findByCommentid_Bookid(bookid);
  }

  @Override
  public List<Comment> getCommentsByUserName(String commentuser) {
    return commentRepository.findByCommentuser(commentuser);
  }

  @Override
  public void deleteComment(CommentId commentId) {
    commentRepository.deleteByCommentid(commentId);
  }


}
