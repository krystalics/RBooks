package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BooksRepository extends CrudRepository<Books,Integer> {

  public Books findBooksByName(@Param("name") String name);

  public Books findBooksByAuthor(String author);
}
