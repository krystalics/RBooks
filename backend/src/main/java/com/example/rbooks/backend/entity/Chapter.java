package com.example.rbooks.backend.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chapter")
public class Chapter {
  @Id
  private int bookid;
  private String chaptername;
  private String content;

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

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
