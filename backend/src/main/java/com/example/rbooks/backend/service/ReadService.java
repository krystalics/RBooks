package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.Comment;
import java.util.List;

public interface ReadService {
  // 本服务由 CommentDao ChapterDao协助完成 chapter在这里只能读，  删除和更新以及写要在writeService中
  // 不提供删除与更改 评论服务
  List<Comment> getComments(ChapterId chapterId);
  List<Comment> getComments(String commentuser);
  String getContent(ChapterId chapterId);
  int add(Comment comment); //返回-1表示失败

}
