package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Followauthor implements Serializable {

  private static final long serialVersionUID = 9L;
  @Id
  private FollowauthorId followauthorId;

  public Followauthor(){}

  public FollowauthorId getFollowauthorId() {
    return followauthorId;
  }

  public void setFollowauthorId(FollowauthorId followauthorId) {
    this.followauthorId = followauthorId;
  }
}
