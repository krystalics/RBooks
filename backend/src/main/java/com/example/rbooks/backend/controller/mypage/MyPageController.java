package com.example.rbooks.backend.controller.mypage;

import com.example.rbooks.backend.service.MyPageService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

  @RequestMapping(value = "/mypage", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
  public String getInformation(@RequestBody Map<String,Integer> userid) {
    // 参数是 Map<String,Integer> 好像不行，因为会报这个错误 Could not find acceptable representation
    return myPageServiceImpl.myPage(userid.get("userid"));
  }


}
