package com.example.rbooks.backend.auth;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD}) //意味着这个注解的适用对象 类，方法
@Documented
@Retention(RetentionPolicy.RUNTIME) //注解的生命周期在运行时依然有效，此时可以拿反射拿到注解的信息
public @interface Authorization {

  IdentityEnums[] value();

}
