package com.example.rbooks.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Embeddable;

@Embeddable
public class CommentId implements Serializable {

  private static final long serialVersionUID = 17L;
  private int bookid;
  private String chaptername;
  @JsonFormat(timezone = "GMT+8")
  private Date datetime;

  public CommentId() {
  }

  public CommentId(int bookid, String chaptername, Date datetime) {
    this.bookid = bookid;
    this.chaptername = chaptername;
    this.datetime = datetime;
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
    result = 37 * result + getBookid()+getDatetime().hashCode();
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
    if (!(obj instanceof CommentId)) {
      return false;
    }
    CommentId castOther = (CommentId) obj;

    return ((getBookid() == castOther.getBookid()))
        && ((this.getChaptername() == castOther.getChaptername()) || (this.getChaptername() != null
        && castOther.getChaptername() != null && this.getChaptername().equals(
        castOther.getChaptername())))&&((this.getDatetime().hashCode() == castOther.getDatetime().hashCode()) || (this.getDatetime() != null
        && castOther.getDatetime() != null && this.getDatetime().equals(
        castOther.getDatetime())));

  }

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }
}