package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,Integer> {
  Book findById(int id);
}
