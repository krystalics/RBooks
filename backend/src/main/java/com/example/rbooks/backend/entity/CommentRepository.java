package com.example.rbooks.backend.entity;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

  List<Comment> findByChapterid(ChapterId chapterId);

  List<Comment> findByCommentuser(String commentuser); //当用户评论一多，返回的自然是 List而非一个Comment

  List<Comment> findByChapterid_Bookid(int bookid); //当用户评论一多，返回的自然是 List而非一个Comment

}
