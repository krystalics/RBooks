package com.example.rbooks.backend.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "information")
public class Information implements Serializable {

  private static final long serialVersionUID = 5L;

  public Information() {
  }

  @Id
  private int userid;
  private String email;
  private String selfintroduction;
  private String photourl;
  private String githubpage;
  private String homepage;
  private String username;

  public int getUserid() {
    return userid;
  }

  public void setUserid(int userid) {
    this.userid = userid;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSelfintroduction() {
    return selfintroduction;
  }

  public void setSelfintroduction(String selfintroduction) {
    this.selfintroduction = selfintroduction;
  }

  public String getPhotourl() {
    return photourl;
  }

  public void setPhotourl(String photourl) {
    this.photourl = photourl;
  }

  public String getGithubpage() {
    return githubpage;
  }

  public void setGithubpage(String githubpage) {
    this.githubpage = githubpage;
  }

  public String getHomepage() {
    return homepage;
  }

  public void setHomepage(String homepage) {
    this.homepage = homepage;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
