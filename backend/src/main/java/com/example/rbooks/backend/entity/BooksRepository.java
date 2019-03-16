package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BooksRepository extends CrudRepository<Books,Integer> {

}
