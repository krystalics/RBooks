package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowbookId;
import java.util.List;

public interface ReadService {

  // 本服务由 CommentDao ChapterDao协助完成 chapter在这里只能读，  删除和更新以及写要在writeService中
  // 不提供删除与更改 评论服务
  List<Comment> getComments(ChapterId chapterId);

  String getContent(ChapterId chapterId);

  int addComment(Comment comment); //返回-1表示失败

  int addFollowAuthor(FollowauthorId id);

  int deleteFollowAuthor(FollowauthorId id);

  int addFollowBook(FollowbookId id);

  int deleteFollowBook(FollowbookId id);
}
