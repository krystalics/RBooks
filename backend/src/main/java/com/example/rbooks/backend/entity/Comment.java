package com.example.rbooks.backend.entity;

import java.io.Serializable;
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
  private CommentId commentid;

  private String commentuser;
  private String content;

  public CommentId getCommentid() {
    return commentid;
  }

  public void setCommentid(CommentId commentid) {
    this.commentid = commentid;
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
