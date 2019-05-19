package com.example.rbooks.backend.auth;

import com.example.rbooks.backend.entity.User;
import com.example.rbooks.backend.entity.UserRepository;
import java.lang.reflect.Method;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class AuthInterceptor implements HandlerInterceptor {

  @Autowired
  private UserRepository userRepository;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    // 由于拦截器 执行顺序优先于 后续的跨域配置，所以直接在拦截器中 进行配置

    response.addHeader("Access-Control-Allow-Origin", "http://test.i.meituan.com");
    response.addHeader("Access-Control-Allow-Credentials", "true");
    response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, HEAD");
    response.addHeader("Access-Control-Allow-Headers", "Content-Type");
    response.addHeader("Access-Control-Max-Age", "3600");

    Cookie cookies[] = request.getCookies();
    String userid = "-1";
    if (cookies == null) {
      return false;
    }
    for (Cookie cookie : cookies) {
//      System.out.println(" cookie "+cookie.getName()+" "+cookie.getValue());
      if (cookie.getName().equals("userid")) {
        userid = cookie.getValue();
      }
    }
    int id = Integer.parseInt(userid);
    if (id < 0) {
      return false;
    }
    User user = userRepository.findById(id);
    int role = user.getRole();

//    System.out.println("role "+role);

    if (handler instanceof HandlerMethod) {
      //获取方法上面的 Authorization注解
      Method method = ((HandlerMethod) handler).getMethod();
      Class<?> clazz = method.getDeclaringClass();
//      System.out.println(clazz.getName());
      Authorization authClass = clazz.getAnnotation(Authorization.class);//在类上的注解
      Authorization authMethod = ((HandlerMethod) handler)
          .getMethodAnnotation(Authorization.class);//方法上的注解
      //方法上的注解粒度更小，优先级更高，所以在authMethod==null的情况下，才使用authClass
      Authorization auth = authMethod == null ? authClass : authMethod;

      if (auth == null) {
        return true; //没有鉴权注解，表示该页面不需要权限
      }

      for (int i = 0; i < auth.value().length; i++) {
        System.out.println(auth.value()[i].ordinal() + auth.value()[i].toString());
        if (auth.value()[i].ordinal() == role) { //如果鉴权注解中包含该用户的权限
          return true;
        }
      }
    }
    response.sendRedirect(request.getContextPath() + "/error");
    return false;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
      ModelAndView modelAndView) throws Exception {

  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
      Object handler, Exception ex) throws Exception {

  }
}
