package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.daoImpl.BookDaoImpl;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.service.HomeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeServiceImpl implements HomeService {

  @Autowired
  private BookDaoImpl bookDaoImpl;

  @Override
  public List<Book> getBooksInfo() {
    return bookDaoImpl.getBooks();
  } //直接调用
}
