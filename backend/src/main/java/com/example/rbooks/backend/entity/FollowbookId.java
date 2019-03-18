package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;

@Embeddable
public class FollowbookId implements Serializable {

  private static final long serialVersionUID = 10L;

  private int userid;
  private int bookid;

  public FollowbookId() {
  }

  public int getUserid() {
    return userid;
  }

  public void setUserid(int userid) {
    this.userid = userid;
  }

  public int getBookid() {
    return bookid;
  }

  public void setBookid(int bookid) {
    this.bookid = bookid;
  }

  @Override
  public int hashCode() {
    // 定义一种hash算法，
    int result = 17;
    result = 37 * result + getUserid();
    result = 37 * result + getBookid();
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
    FollowbookId castOther = (FollowbookId) obj;

    return ((getUserid() == castOther.getUserid()))
        && ((this.getBookid() == castOther.getBookid()));

  }

}
