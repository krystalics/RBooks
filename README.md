### 用于实践所学的小站点，reactNative springboot mysql

---

模仿的Love2站点，自己做的简单项目。[love2](https://love2.io) 

项目建立时间是2019.2.24 ，当时只是有这个模糊的想法，直到后面才开始陆续启动工作。

0.1版本是完成了前期的设计工作。2019.3.4~2019.3.14

0.2版本完成后台的基本功能  2019.3.15~2019.3.19，缺陷还有很多比如：一个用户在一个章节中只能评论一次，之后的评论只是更新那个评论。对数据的格式并没有进行筛查，不能发现不合法数据(很多可能都会让程序运行产生各种错误，然后返回的数据就是错误的信息，相信用户一定不希望看到这种场面)  。 还有就是不知道从哪里听说的，永远不要相信前端会做好数据校验，即使有，后面也应该多一道防护。(不歧视前端，反而觉得前端也很难)

**2019.3.19** [具体的开发流程请看这个文档](https://github.com/krystalics/RBooks/blob/master/%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0.markdown)

下一版本的任务是：使用 Spring-session 和redis搭建起一定期限内可以免登录的站点，Shiro来做权限支持。前端的页面也可以开始动起来了。 改善0.2 版本的不足。

*ps(以后有什么事情自己举棋不定，想要找别人一起时最好自己做决定，否则如果没有人一起，就会有很大的概率放弃)* 这是想找人一起去华科参加京东实习招聘时的经历，一开始我还是很想去的，但是有点犹豫就想找其他人一起，结果没有人和我一起，很难受。

说一说我现在对SpringBoot的认识吧：

真的超级简单强大，简单是几乎不用任何配置文件就能够构建一个小的站点后台，就像我这个项目一样，只要前期工作做得好，后期编码连带google一些bug的时间也总共不到5天。

强大：之前是跟着书本上学习的SpringBoot技术，当时只是知道有这么个东西，时隔几个月(我是2018.10月份左右接触大概1月份之后就没碰了)当时的技术细节早就忘干净了。当我开始正式编码时，还是很忐忑的，基本上都是靠着csdn等博客网站的技术支持才没放弃（感谢这个高度发达的互联网）。

整个小项目下来，我发现spring的核心IoC是这样的：将提供各个服务的类标注为 component (相当于将其注册到BeanFactory中)，当需要时只要使用`@Autowired` 注解就可以从BeanFactory中获得该类的实例，不需要我们自己new它，管理它的依赖关系。

特别的强大，不过SpringBoot还是不推荐使用`@Component` 因为这样分类不明确，`@Service @Repository @Controller @Entity  `是更具体的分类，顾名思义，Service主要是逻辑代码，Repository主要是Dao接口连接Entity (关联数据库的实体类) ,Controller 是负责与前端交互数据的模块。Component在你并不清楚该类属于什么模块时使用

```java
public interface superA{
    
}

@Component
public class A implements superA{
    
}

public class B{
    @Autowired
    private superA a; //获得A的实例对象  ,也不一定要通过接口  A a也是可以的
}
```

还有就是 JPA的强大，CrudRepository可以拓展各种方法，**并不需要我们实现**，只需要通过字段名和单词就能知道该方法的作用。

```java
package com.example.rbooks.backend.entity;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,Integer> {
  Book findById(int id);  //通过id找到Book
  List<Book> findByAuthor(String author); //找到对应author的所有书
  void deleteById(int id); //删除该id的book
  Book findByNameAndAuthor(String name,String author); //这个方法主要是找到新建书 的 id
  Boolean existsById(int id); //该id存在于表中吗？
  ...
  //非常多，完全是自己拓展的。之前看书的时候可没有想到这么好用
}

```

刚才在chapter中加了一个字段 datetime,发现只需要在entity模块中对应的类中加上去并生成getter和setter就可以了，根本不需要修改其他东西。这种易拓展和健壮性简直牛逼啊。



缺点就是：或者说是面向对象的缺点就是好的代码结构中各种类和接口太多了，本来只需要一半的代码就可以搞定，但是愣是要多写接口，多写几个类来明确层次结构，减少耦合。对程序员的要求比较高。还好不用管理复杂的依赖关系，不然就gg了。



##### 3.22 

实际上由于时间关系，我可能要变更技术方案，不采用ReactNative方案做Android的客户端了。决定采用更快捷的Cordova或者使用原生Android来做移动端的app。而我在写移动端的app之前，想要先写出一版pc网站，所以无疑采用Cordova是更加合适的。额，还是要看时间，因为我发现还有很多东西需要准备，不管是笔试还是面试。