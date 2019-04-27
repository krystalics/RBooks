package com.example.rbooks.backend.entity;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

// 从 CrudRepository 到 PagingAndSortingRepository 是因为之后的有提供 排序和分页功能
public interface BookRepository extends PagingAndSortingRepository<Book,Integer> {
  Book findById(int id);
  List<Book> findByAuthor(String author); //找到对应作者的所有书
  void deleteById(int id);
  Book findByNameAndAuthor(String name,String author); //这个方法主要是找到新建书 的 id


}