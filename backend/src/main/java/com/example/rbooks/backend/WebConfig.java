package com.example.rbooks.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    //添加映射路径
    registry.addMapping("/**")
        //放行哪些原始域
        .allowedOrigins("*")
        //是否发送Cookie信息
        .allowCredentials(true)
        //放行哪些原始域(请求方式)
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        //放行哪些原始域(头部信息)
        .allowedHeaders("*")
        //暴露哪些头部信息（因为跨域访问默认不能获取全部头部信息）
        .exposedHeaders("Header1", "Header2");
  }

  /*
  * created by 林家宝
  * 2019.4.25
  * 增加加密解密的算法包
  * */
//  @Bean
//  public FilterRegistrationBean<EncryptionFilter> filterRegistration(){
//    EncryptionConfig config=new EncryptionConfig();
//    config.setKey("abcde0123456789");
//    config.setRequestDecyptUriList(Arrays.asList("/save","/decryptEntityXml"));
//    config.setResponseEncryptUriList(Arrays.asList("/encryptStr","/encryptEntity"));
//
//    FilterRegistrationBean<EncryptionFilter> registrationBean=new FilterRegistrationBean<>();
//    registrationBean.setFilter(new EncryptionFilter(config));
//    registrationBean.addUrlPatterns("/*");
//    registrationBean.setName("EncryptionFilter");
//    registrationBean.setOrder(1);
//    return registrationBean;
//  }


}
