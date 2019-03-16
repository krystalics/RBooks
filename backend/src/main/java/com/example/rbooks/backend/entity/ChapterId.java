package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;

// chapter 的主键类
@Embeddable
public class ChapterId implements Serializable {

  private static final long serialVersionUID = 7L;
  private int bookid;
  private String chaptername;

  public ChapterId() {
  }

  public ChapterId(int bookid, String chaptername) {
    this.bookid = bookid;
    this.chaptername = chaptername;
  }

  public int getBookid() {
    return bookid;
  }

  public void setBookid(int bookid) {
    this.bookid = bookid;
  }

  public String getChaptername() {
    return chaptername;
  }

  public void setChaptername(String chaptername) {
    this.chaptername = chaptername;
  }

  @Override
  public int hashCode() {
    // 定义一种hash算法，
    int result = 17;
    result = 37 * result + getBookid();
    result = 37 * result + (getChaptername() == null ? 0 : this.getChaptername().hashCode());
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
    ChapterId castOther = (ChapterId) obj;

    return ((getBookid() == castOther.getBookid()))
        && ((this.getChaptername() == castOther.getChaptername()) || (this.getChaptername() != null
        && castOther.getChaptername() != null && this.getChaptername().equals(
        castOther.getChaptername())));

  }
}
