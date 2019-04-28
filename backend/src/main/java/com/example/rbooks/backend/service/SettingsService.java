package com.example.rbooks.backend.service;

import com.example.rbooks.backend.entity.Information;

public interface SettingsService {
  // 只提供 更新接口
  int update(Information information);

  Information getInformation(int userid);

}
