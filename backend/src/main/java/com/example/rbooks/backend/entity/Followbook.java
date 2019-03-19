package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Followbook implements Serializable {

  private static final long serialVersionUID = 11L;
  @Id
  private FollowbookId followbookid;

  public Followbook() {
  }

  public FollowbookId getFollowbookid() {
    return followbookid;
  }

  public void setFollowbookid(FollowbookId followbookid) {
    this.followbookid = followbookid;
  }
}
