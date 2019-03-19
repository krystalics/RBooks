package com.example.rbooks.backend.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment implements Serializable {

  private static final long serialVersionUID = 3L;

  public Comment() {
  }

  @Id
  private ChapterId chapterid;
  private Date datetime;
  private String commentuser;
  private String content;

  public ChapterId getChapterid() {
    return chapterid;
  }

  public void setChapterid(ChapterId chapterid) {
    this.chapterid = chapterid;
  }

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public String getCommentuser() {
    return commentuser;
  }

  public void setCommentuser(String commentuser) {
    this.commentuser = commentuser;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
