package com.example.rbooks.backend.entity;

import org.springframework.data.repository.CrudRepository;

public interface InformationRepository extends CrudRepository<Information,Integer> {
  Information findByUserid(int useriId);
}
