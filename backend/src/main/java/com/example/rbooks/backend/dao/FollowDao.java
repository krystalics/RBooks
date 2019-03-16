package com.example.rbooks.backend.dao;

public interface FollowDao {

  void setFollowAuthorId(); //关注

  void setFollowBookId();// 收藏

  void deleteFollowAuthorId(); //不再关注

  void deleteFollowBookId(); //不收藏该书

  int[] getFollowAuthorsId(); //返回关注的作者的id

  int[] getFollowBooksId(); // 返回收藏的书本的id


}
