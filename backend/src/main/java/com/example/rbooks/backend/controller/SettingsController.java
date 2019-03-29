package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SettingsController {
  // 只提供一个 更新接口即可

  private final SettingsService settingsServiceImpl;

  @Autowired
  public SettingsController(SettingsService settingsServiceImpl) {
    this.settingsServiceImpl = settingsServiceImpl;
  }

  @RequestMapping(value = "/settings",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
  public String update(@RequestBody Information information){ //之后的版本会有需要照片上传，文件的传输之后迭代时再搞
    settingsServiceImpl.update(information);
    return "设置成功";
  }
}
