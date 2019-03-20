package com.example.rbooks.backend.entity;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,Integer> {
  Book findById(int id);
  List<Book> findByAuthor(String author); //找到对应作者的所有书
  void deleteById(int id);
  Book findByNameAndAuthor(String name,String author); //这个方法主要是找到新建书 的 id
}