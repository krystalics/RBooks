package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.BookDao;
import com.example.rbooks.backend.entity.Book;
import com.example.rbooks.backend.entity.BookRepository;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

  @Override
  public List<Book> getHotBooks(int page) {
    return getBooks("love",page);
  }

  @Override
  public List<Book> getNewBooks(int page) {
    return getBooks("datetime",page);
  }



  public List<Book> getBooks(String properties,int page){
    Sort sort=new Sort(Direction.DESC,properties);
    Iterable<Book> iterable=bookRepository.findAll(sort);
    //
    List<Book> books=new ArrayList<>();
    // 获得第page页的内容
    int count=0;
    int i=0;
    int index=page*10;
    for(Book book:iterable){
      if(i<index) i++;
      else{
        if(count<=10) {  //从第 page * 10 个记录开始，获取10个记录
          count++;
          books.add(book);
        }
        else {
          break;
        }
      }

    }
    return books;
  }

}
