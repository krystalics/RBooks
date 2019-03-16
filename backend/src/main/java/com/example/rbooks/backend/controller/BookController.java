package com.example.rbooks.backend.controller;

import org.springframework.web.bind.annotation.RestController;

/*
* 被@Controller标注的类负责处理由DispatcherServlet分发的请求，
* 它把用户请求的数据经过业务处理层处理之后封装成一个Model ，
* 然后再把该Model返回给对应的View进行展示
*
* @ResponseBody注解支持将返回值放在response体内，而不是返回一个视图
  @ResponseBody注解直接将返回的对象输出到客户端
  如果返回字符串，直接返回
  如果返回不是字符串，默认使用Jackson将对象序列化成JSON字符串后输出

  @RestController是一个组合注解
  @RestController = @Controller + @ResponseBody
  @RestController注解直接将返回的对象输出到客户端
* */
@RestController
public class BookController {

}
