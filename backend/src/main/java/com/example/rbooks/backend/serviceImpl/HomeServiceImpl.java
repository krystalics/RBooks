package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.daoImpl.BookDaoImpl;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.service.HomeService;
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
  public List<Book> getHotBooksInfo() {
    return bookDaoImpl.getHotBooks();
  }

  @Override
  public List<Book> getNewBooksInfo() {
    return bookDaoImpl.getNewBooks();
  }
}
