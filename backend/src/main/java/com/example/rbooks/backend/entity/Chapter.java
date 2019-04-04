package com.example.rbooks.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.util.Date;
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
  @JsonFormat(timezone = "GMT+8")
  private Date datetime;

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

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
