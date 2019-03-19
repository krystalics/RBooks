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
  private ChapterId chapterid;
  private String content;

  public Chapter(){}

  public ChapterId getChapterid() {
    return chapterid;
  }

  public void setChapterid(ChapterId chapterid) {
    this.chapterid = chapterid;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
