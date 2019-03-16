package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chapter")
public class Chapter implements Serializable {

  private static final long serialVersionUID = 2L;

  @Id
  private ChapterId chapterId;
  private String content;

  public Chapter(){}

  public ChapterId getChapterId() {
    return chapterId;
  }

  public void setChapterId(ChapterId chapterId) {
    this.chapterId = chapterId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
