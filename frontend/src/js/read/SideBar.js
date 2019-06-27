import React,{Component} from 'react';

import {_addFollowBook, _deleteFollowBook, _isFollowBook} from "../api";
import {Button} from "react-bootstrap";
import {checkCookie} from "../CookieService";

class SideBar extends Component{

  constructor(props) {
    super(props);
    this.state={
      loveChapter:'点赞'
    };

    this.handleFollowBook=this.handleFollowBook.bind(this);
  }

  componentWillMount() {
    this.isFollowBook();
  }

  async isFollowBook() {
    let followbookid = {
      bookid: localStorage.getItem('currentBookId'),
      userid: localStorage.getItem('userid'),
      chaptername:localStorage.getItem('currentBookChapter')
    };
    const res1 = await _isFollowBook(followbookid);
    // console.log(res1.data);
    if (res1.data) { //如果已经点赞过了

      this.setState({loveChapter: "取消"});
    } else {
      this.setState({loveChapter: "点赞"});
    }

  }


  async handleFollowBook() { //需要登录才能点赞

    if (!checkCookie()) {
      alert('请先登录');
      return;
    }
    let followbookid = {
      bookid: localStorage.getItem('currentBookId'),
      userid: localStorage.getItem('userid'),
      chaptername:localStorage.getItem('currentBookChapter')
    };

    if (this.state.followbook === "点赞") {
      const res1 = await _addFollowBook(followbookid);
      // console.log(res1.data);
      if (res1.status === 200) {
        this.setState({followbook: "取消"});
      } else {
        alert("收藏失败" + res1.data);
      }

    } else {
      const res2 = await _deleteFollowBook(followbookid);
      if (res2.status === 200) {
        this.setState({followbook: "点赞"});
      } else {
        alert("取消" + res2.data);
      }
    }

  }


  render() {
    return (
        <div className='sidebar'>
          <Button variant="info" onClick={this.handleFollowBook}>{this.state.loveChapter}</Button>
        </div>
    );
  }
}

export default SideBar;