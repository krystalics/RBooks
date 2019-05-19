package com.example.rbooks.backend;

import com.example.rbooks.backend.auth.AuthInterceptor;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebConfig implements WebMvcConfigurer {

//
//  @Bean
//  public CorsFilter corsFilter(){
//    //1. 添加 CORS配置信息
//    CorsConfiguration config = new CorsConfiguration();
//    //放行哪些原始域
//    config.addAllowedOrigin("*");
//    //是否发送 Cookie
//    config.setAllowCredentials(true);
//    //放行哪些请求方式
//    config.addAllowedMethod("*");
//    //放行哪些原始请求头部信息
//    config.addAllowedHeader("*");
//    //暴露哪些头部信息
//    config.addExposedHeader("*");
//    //2. 添加映射路径
//    UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
//    corsConfigurationSource.registerCorsConfiguration("/**",config);
//    //3. 返回新的CorsFilter
//
//
//    return new CorsFilter();
//
//  }

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

  // 配置鉴权 拦截器
  @Bean
  public AuthInterceptor authInterceptor(){
    return new AuthInterceptor();
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
   //添加拦截器
    InterceptorRegistration registration= registry.addInterceptor(authInterceptor());

    //排除 掉一些不需要鉴权的页面和资源
    registration.excludePathPatterns("/user/login");
    registration.excludePathPatterns("/user/register");
    registration.excludePathPatterns("/home/getnew");
    registration.excludePathPatterns("/home/gethot");
    registration.excludePathPatterns("/home/getall");
    registration.excludePathPatterns("/home/getsearch");

    registration.addPathPatterns("/**"); //再将所有都添加路劲添加进去

  }
}
