package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.Follow;
import java.util.List;

public interface FollowDao {

  void setFollowAuthorId(int userId,int authorId); //关注

  void setFollowBookId(int userId,int bookId); //收藏

  void deleteFollowAuthorId(int userId,int authorId); //不再关注

  void deleteFollowBookId(int userId,int bookId); //不收藏该书

  List<Follow> getFollows(int userId); //返回 用户的 所有关注和收藏


}
