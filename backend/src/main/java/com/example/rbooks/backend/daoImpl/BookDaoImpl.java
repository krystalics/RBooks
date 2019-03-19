package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.BookRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

  @Transactional  //删除操作 必须是 Transaction的
  @Override
  public void deleteBook(int id) { //前端会传过来id的
    bookRepository.deleteById(id);
  }

  @Override
  public void updateBook(Book book) {
    bookRepository.save(book); //若该id存在于表中就是更新，若不是则是增加
  }

  @Override
  public Book getBookById(int id) {
    return bookRepository.findById(id);
  }

  @Override
  public Book getBookByNameAndAuthor(String name, String author) {
    return bookRepository.findByNameAndAuthor(name, author);
  }

  @Override
  public List<Book> getAllBooks() {
    List<Book> bookList = new ArrayList<>();
    Iterable<Book> books = bookRepository.findAll(); //一次加载整张表中的内容，会影响响应速度，后期要优化
    for (Book book : books) {
      bookList.add(book);
    }

    return bookList;
  }

  @Override
  public List<Book> getBooksByAuthor(String author) {
    return bookRepository.findByAuthor(author);
  }
}
