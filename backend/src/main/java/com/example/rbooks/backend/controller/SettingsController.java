package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.auth.Authorization;
import com.example.rbooks.backend.auth.IdentityEnums;
import com.example.rbooks.backend.entity.Information;
import com.example.rbooks.backend.service.SettingsService;
import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/settings")
@Authorization(value = {IdentityEnums.VISITOR,IdentityEnums.ADMIN,IdentityEnums.SUPER_ADMIN})
public class SettingsController {
  // 只提供一个 更新接口即可

  private final SettingsService settingsServiceImpl;

  @Autowired
  public SettingsController(SettingsService settingsServiceImpl) {
    this.settingsServiceImpl = settingsServiceImpl;
  }

  @RequestMapping(value = "/updatesettings",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String update(@RequestBody Information information){ //之后的版本会有需要照片上传，文件的传输之后迭代时再搞
    settingsServiceImpl.update(information);
    return "设置成功";
  }

  @RequestMapping("/getsettings")
  public Information getSettins(@RequestParam int userid){

    return settingsServiceImpl.getInformation(userid);
  }

}
