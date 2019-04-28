import React, {Component} from 'react';

import '../../css/main.css'
import {ListGroup} from "react-bootstrap";

import {
  _addFollowAuthor,
  _addFollowBook,
  _deleteFollowAuthor,
  _deleteFollowBook,
  _isFollowAuthor,
  _isFollowBook
} from '../api'

// 这个组件渲染  关注，收藏 到顶端，
class ReadSideBar extends Component {

  constructor(props) {
    super(props);
    this.state = { //默认都是没有收藏，关注
      followauthor: "关注作者",
      followbook: "点赞收藏"
    };
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);
    this.handleFollowBook = this.handleFollowBook.bind(this);
    this.handleTop = this.handleTop.bind(this);
  }

  async componentWillMount() {
    //需要先获得是否有关注或者收藏

    this.isFollowBook();
    this.isFollowAuthor();
  }

  async isFollowBook(){
    let followbookid = {
      bookid: this.props.id,
      userid: localStorage.getItem('userid')
    };

    const res1=await _isFollowBook(followbookid);
    if (res1.data) { //如果已经点赞过了
      this.setState({followbook: "取消点赞"});
    } else {
      this.setState({followbook: "点赞收藏"});
    }

  }

  async isFollowAuthor(){
    let param = {
      userid: localStorage.getItem('userid'),
      authorname: this.props.author
    };


    const res2=await _isFollowAuthor(param);
    if (res2.data) {
      this.setState({followauthor: "取消关注"});
    } else {
      this.setState({followauthor: "关注作者"});
    }
  }

  async handleFollowBook() { //需要bookid 和 userid

    if (typeof (this.props.id) === "undefined" || localStorage.getItem(
        'userid')
        === "undefined") {
      return;
    }
    let followbookid = {
      bookid: this.props.id,
      userid: localStorage.getItem('userid')
    };

    if (this.state.followbook === "点赞收藏") {
      const res1=await _addFollowBook(followbookid);
      if(res1.status===200)
        this.setState({followbook: "取消点赞"});
      else
        alert("收藏失败" + res1.data);

    } else {
      const res2=await _deleteFollowBook(followbookid);
      if(res2.status===200)
        this.setState({followbook: "点赞收藏"});

      else
        alert("取消失败" + res2.data);
    }

  }

  async handleFollowAuthor() { //需要authorid 和 userid
    if (typeof (this.props.author) === "undefined" || localStorage.getItem(
        'userid') === "undefined") {
      return;
    }
    let param = {
      userid: localStorage.getItem('userid'),
      authorname: this.props.author
    };
    if (this.state.followauthor === "关注作者") { //当点击时，显示的是关注作者，说明之前没有关注过
      const res=await _addFollowAuthor(param);
      if (res.status===200) {
        this.setState({followauthor: "取消关注"}); //关注完之后，变成取消关注
      } else {
        alert("关注失败" + res.data);
      }

    } else if(this.state.followauthor === "取消关注"){
      const res=await _deleteFollowAuthor(param);
      if (res.status===200) {
        this.setState({followauthor: "关注作者"});
      } else {
        alert("取消失败" + res.data);
      }

    }
  }

  handleTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {

    return (
        <div className="sidebar_right">
          <ListGroup>
            <li onClick={this.handleFollowBook}><ListGroup.Item action
                                                                variant="info">{this.state.followbook}</ListGroup.Item>
            </li>
            <li onClick={this.handleFollowAuthor}><ListGroup.Item action
                                                                  variant="primary">{this.state.followauthor}</ListGroup.Item>
            </li>
            <li onClick={this.handleTop}><ListGroup.Item action
                                                         variant="success">到顶部</ListGroup.Item>
            </li>

          </ListGroup>
        </div>
    )
        ;
  }
}

export default ReadSideBar;
