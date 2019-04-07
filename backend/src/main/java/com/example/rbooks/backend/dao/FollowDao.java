package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.Followauthor;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.Followbook;
import com.example.rbooks.backend.entity.FollowbookId;
import java.util.List;

public interface FollowDao {

  List<Followauthor> getAllUsers();

  List<Followbook> getAllBooks();

  Boolean exsitsFollowAuthor(FollowauthorId followauthorId);

  Boolean exsitsFollowBook(FollowbookId followbookId);

  int addFollowAuthor(FollowauthorId id);

  int deleteFollowAuthor(FollowauthorId id);

  int addFollowBook(FollowbookId id);

  int deleteFollowBook(FollowbookId id);

}
