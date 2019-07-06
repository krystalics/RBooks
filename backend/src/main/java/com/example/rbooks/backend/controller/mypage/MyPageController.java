package com.example.rbooks.backend.controller.mypage;

import com.example.rbooks.backend.auth.Authorization;
import com.example.rbooks.backend.auth.IdentityEnums;
import com.example.rbooks.backend.service.MyPageService;
import javax.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class MyPageController {
  //获取Information中的信息，加上Follow中的 收藏关注，以及作品集。
  //需要 的是集上面三个表中的信息集合服务

  private final MyPageService myPageServiceImpl;

  @Autowired
  public MyPageController(MyPageService myPageServiceImpl) {
    this.myPageServiceImpl = myPageServiceImpl;
  }

  @Authorization(value = {IdentityEnums.VISITOR,IdentityEnums.ADMIN,IdentityEnums.SUPER_ADMIN})
  @RequestMapping(value = "/mypage")
  public String getInformation(@RequestParam int userid) {
//    System.out.println("userid是  "+userid);
    return myPageServiceImpl.myPage(userid);
  }


}
