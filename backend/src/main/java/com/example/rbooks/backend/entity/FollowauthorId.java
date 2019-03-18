package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;

@Embeddable
public class FollowauthorId implements Serializable {

  private static final long serialVersionUID = 8L;

  private int userid;
  private int authorid;

  public FollowauthorId() {
  }

  public int getUserid() {
    return userid;
  }

  public void setUserid(int userid) {
    this.userid = userid;
  }

  public int getAuthorid() {
    return authorid;
  }

  public void setAuthorid(int authorid) {
    this.authorid = authorid;
  }


  @Override
  public int hashCode() {
    // 定义一种hash算法，
    int result = 17;
    result = 37 * result + getUserid();
    result = 37 * result + getAuthorid();
    return result;
  }

  @Override
  public boolean equals(Object obj) { //重写equals 和hashcode
    if ((this == obj)) {
      return true;
    }
    if ((obj == null)) {
      return false;
    }
    if (!(obj instanceof ChapterId)) {
      return false;
    }
    FollowauthorId castOther = (FollowauthorId) obj;

    return ((getUserid() == castOther.getUserid()))
        && ((this.getAuthorid() == castOther.getAuthorid()));

  }

}
