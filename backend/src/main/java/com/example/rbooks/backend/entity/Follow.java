package com.example.rbooks.backend.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "follow")
public class Follow {
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
