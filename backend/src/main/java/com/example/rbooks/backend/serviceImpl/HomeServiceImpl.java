package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.service.HomeService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeServiceImpl implements HomeService {

  @Autowired
  private BookDao bookDaoImpl;

  @Override
  public List<Book> getBooksInfo() {
    return bookDaoImpl.getAllBooks();
  } //直接调用

  @Override
  public List<Book> getHotBooksInfo(int page) {
    return bookDaoImpl.getHotBooks(page);
  }

  @Override
  public List<Book> getNewBooksInfo(int page) {
    return bookDaoImpl.getNewBooks(page);
  }

  @Override
  public List<Book> getSearchBooksInfo(String word) {
    List<Book> allbooks = bookDaoImpl.getAllBooks();
    List<Book> res = new ArrayList<>();
    for (Book book : allbooks) { //如果书名或者作者名或者描述中  有包括word
      if (book.getAuthor().contains(word) || book.getName().contains(word) || book.getDescription()
          .contains(word)) {
        res.add(book);
      }
    }

    return res;
  }

  public List<Book> getTagBooks(String tag) {
    List<Book> allbooks = bookDaoImpl.getAllBooks();
    List<Book> res = new ArrayList<>();
    for (Book book : allbooks) { //所有该标签的都返回
      if (book.getLabel().equals(tag)) {
        res.add(book);
      }
    }

    return res;
  }


}
