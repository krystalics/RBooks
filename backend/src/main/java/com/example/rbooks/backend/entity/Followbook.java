package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Followbook implements Serializable {

  private static final long serialVersionUID = 11L;
  @Id
  private FollowbookId followbookId;

  public Followbook() {
  }

  public FollowbookId getFollowbookId() {
    return followbookId;
  }

  public void setFollowbookId(FollowbookId followbookId) {
    this.followbookId = followbookId;
  }
}
