package com.example.rbooks.backend.dao;

import com.example.rbooks.backend.entity.Information;

public interface InformationDao {

  void addInformation(Information information);

  void deleteInformation(int userId);

  void updateInformation(Information information);

  Information getInformation(int userId);
}
