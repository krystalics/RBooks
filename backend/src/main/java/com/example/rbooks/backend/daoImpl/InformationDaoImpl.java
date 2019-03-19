package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.InformationDao;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.entity.InformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InformationDaoImpl implements InformationDao {

  private final InformationRepository informationRepository;

  @Autowired
  public InformationDaoImpl(InformationRepository informationRepository) {
    this.informationRepository = informationRepository;
  }

  @Override
  public void updateInformation(Information information) {
    informationRepository.save(information);
  }

  @Override
  public Information getInformation(int userId) {
    return informationRepository.findByUserid(userId);
  }
}
