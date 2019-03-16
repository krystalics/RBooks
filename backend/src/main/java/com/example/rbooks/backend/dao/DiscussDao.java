package com.example.rbooks.backend.dao;

public interface DiscussDao {

  void storeComment(String comment);

  void deleteComment();

  String readComment();

}
