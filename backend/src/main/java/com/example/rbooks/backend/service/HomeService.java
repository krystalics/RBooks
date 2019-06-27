package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Book;
import java.util.List;

public interface HomeService {

  List<Book> getBooksInfo();

  List<Book> getHotBooksInfo(int page);

  List<Book> getNewBooksInfo(int page);

  List<Book> getSearchBooksInfo(String word);

  List<Book> getTagBooks(String tag);
}
