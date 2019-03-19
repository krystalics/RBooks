package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Followauthor implements Serializable {

  private static final long serialVersionUID = 9L;
  @Id
  private FollowauthorId followauthorid;

  public Followauthor(){}

  public FollowauthorId getFollowauthorid() {
    return followauthorid;
  }

  public void setFollowauthorid(FollowauthorId followauthorid) {
    this.followauthorid = followauthorid;
  }
}
