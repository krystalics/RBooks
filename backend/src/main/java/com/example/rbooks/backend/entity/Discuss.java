package com.example.rbooks.backend.entity;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "discuss")
public class Discuss {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private int bookid;
  private String chaptername;
  private Date datetime;
  private String discussusername;
  private String content;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
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

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public String getDiscussusername() {
    return discussusername;
  }

  public void setDiscussusername(String discussusername) {
    this.discussusername = discussusername;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
