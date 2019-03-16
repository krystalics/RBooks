package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "follow")
public class Follow implements Serializable {

  private static final long serialVersionUID = 4L;

  public Follow() {

  }
  // 这个表实际上没有主键，这里标注只是需要满足Hibernate的需要  ，
  // 然后 followauthorid或者followbookid 必有一空，因为只要关注或者收藏就会生成一个Follow，
  // 其实这可以分成两个表，因为这两个都是多值依赖，但是只有一个id值的情况下，让其为NULL就好了
  @Id
  private int userid;
  private int followauthorid;
  private int followbookid;

  public int getUserid() {
    return userid;
  }

  public void setUserid(int userid) {
    this.userid = userid;
  }

  public int getFollowauthorid() {
    return followauthorid;
  }

  public void setFollowauthorid(int followauthorid) {
    this.followauthorid = followauthorid;
  }

  public int getFollowbookid() {
    return followbookid;
  }

  public void setFollowbookid(int followbookid) {
    this.followbookid = followbookid;
  }
}
