package com.example.rbooks.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;
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
  private Date createtime;
  @JsonFormat(timezone = "GMT+8")
  private Date updatetime;

  private int love;

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

  public Date getCreatetime() {
    return createtime;
  }

  public void setCreatetime(Date createtime) {
    this.createtime = createtime;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Date getUpdatetime() {
    return updatetime;
  }

  public void setUpdatetime(Date updatetime) {
    this.updatetime = updatetime;
  }

  public int getLove() {
    return love;
  }

  public void setLove(int love) {
    this.love = love;
  }
}
