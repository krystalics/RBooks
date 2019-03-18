package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.BookRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {

  private final BookRepository bookRepository;

  @Autowired
  public BookDaoImpl(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  @Override
  public void addBook(Book book) {
    bookRepository.save(book);
  }

  @Override
  public void deleteBook(Book book) { //前端会传过来id的
    bookRepository.delete(book);
  }

  @Override
  public void updateBook(Book book) {
    bookRepository.save(book); //若该id存在于表中就是更新，若不是则是增加
  }

  @Override
  public Book getBook(int id) {
    return bookRepository.findById(id);
  }

  @Override
  public List<Book> getBooks() {
    List<Book> bookList=new ArrayList<>();
    Iterable<Book> books=bookRepository.findAll(); //一次加载整张表中的内容，会影响响应速度，后期要优化
    for (Book book : books) {
      bookList.add(book);
    }

    return bookList;
  }
}
