package com.example.rbooks.backend.controller;

import com.example.rbooks.backend.auth.Authorization;
import com.example.rbooks.backend.auth.IdentityEnums;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/manager")
@RestController
public class ManagerController {

  @Authorization(value = {IdentityEnums.ADMIN, IdentityEnums.SUPER_ADMIN})
  @RequestMapping("/test")
  public String manager() {
    return "管理员界面";
  }


}
