package com.example.rbooks.backend.serviceImpl;

import com.example.rbooks.backend.dao.InformationDao;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsServiceImpl implements SettingsService {

  @Autowired
  private InformationDao informationDaoImpl;

  @Override
  public int update(Information information) {
    informationDaoImpl.updateInformation(information);
    return 1; //默认可以更新陈宫
  }
}
