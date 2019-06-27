import React, {Component} from 'react';
import DirectoryList from "./DirectoryList";
import Content from "./Content";
import {
  _addFollowAuthor,
  _addFollowBook,
  _deleteFollowAuthor,
  _deleteFollowBook,
  _getDirectory,
  _isFollowAuthor,
  _isFollowBook
} from '../api'
import '../../css/main.css'
import Button from "react-bootstrap/Button";
import NavLink from "react-bootstrap/NavLink";


class Read extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookid: localStorage.getItem('currentBookId'),
      author: localStorage.getItem('currentBookAuthor'),
      directory: [],
      description: localStorage.getItem('currentBookDes'),
      style: this.styleIn,
      followauthor: "关注作者",
      followbook: "点赞收藏"

    };
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);
    this.handleFollowBook = this.handleFollowBook.bind(this);
  }

  componentDidMount() { //获得数据

    this.getData();
    this.isFollowBook();
    this.isFollowAuthor();
  }

  async getData() {
    const res = await _getDirectory(this.state.bookid);
    // console.log(res.data); 之前是因为没有权限 和被拦截了
    this.setState({directory: res.data});
  }

  handleStyleChange() {
    if (this.state.style === this.styleOut) {
      this.setState({style: this.styleIn})
    } else {
      this.setState({style: this.styleOut})
    }
  }

  async isFollowBook() {
    let followbookid = {
      bookid: this.state.bookid,
      userid: localStorage.getItem('userid')
    };

    const res1 = await _isFollowBook(followbookid);
    if (res1.data) { //如果已经点赞过了
      this.setState({followbook: "取消点赞"});
    } else {
      this.setState({followbook: "点赞收藏"});
    }

  }

  async isFollowAuthor() {
    let param = {
      userid: localStorage.getItem('userid'),
      authorname: this.state.author
    };

    const res2 = await _isFollowAuthor(param);
    if (res2.data) {
      this.setState({followauthor: "取消关注"});
    } else {
      this.setState({followauthor: "关注作者"});
    }
  }

  async handleFollowBook() { //需要bookid 和 userid

    if (typeof (this.state.bookid) === "undefined" || localStorage.getItem(
        'userid')
        === "undefined") {
      return;
    }
    let followbookid = {
      bookid: this.state.bookid,
      userid: localStorage.getItem('userid')
    };

    if (this.state.followbook === "点赞收藏") {
      const res1 = await _addFollowBook(followbookid);
      if (res1.status === 200) {
        this.setState({followbook: "取消点赞"});
      } else {
        alert("收藏失败" + res1.data);
      }

    } else {
      const res2 = await _deleteFollowBook(followbookid);
      if (res2.status === 200) {
        this.setState({followbook: "点赞收藏"});
      } else {
        alert("取消失败" + res2.data);
      }
    }

  }

  async handleFollowAuthor() { //需要authorid 和 userid
    if (typeof (this.state.author) === "undefined" || localStorage.getItem(
        'userid') === "undefined") {
      return;
    }
    let param = {
      userid: localStorage.getItem('userid'),
      authorname: this.state.author
    };
    if (this.state.followauthor === "关注作者") { //当点击时，显示的是关注作者，说明之前没有关注过
      const res = await _addFollowAuthor(param);
      if (res.status === 200) {
        this.setState({followauthor: "取消关注"}); //关注完之后，变成取消关注
      } else {
        alert("关注失败" + res.data);
      }

    } else if (this.state.followauthor === "取消关注") {
      const res = await _deleteFollowAuthor(param);
      if (res.status === 200) {
        this.setState({followauthor: "关注作者"});
      } else {
        alert("取消失败" + res.data);
      }

    }
  }

  styleIn = {
    borderRight: "1px solid rgba(0,0,0,0.1)",
    zIndex: "3",
    background: "white",
    width: "200px",
    height: "100%",

  };
  styleOut = {
    display: "none"
  };

  render() {

    return (
        <div className="content-read">

          <div className='directory' style={this.state.style}>
            <DirectoryList directory={this.state.directory}/>
          </div>

          <div className='read-header-title'>
            <span>{localStorage.getItem('currentBookName')}</span>
          </div>

          <div className="read-content-middle">

            <div className='read-header'>
              <div className="read-header-menu">
                <Button onClick={this.handleStyleChange.bind(this)}
                        className="menu-left" variant="light">+</Button>
                <li><NavLink href="/" variant='none'> RBooks</NavLink></li>
              </div>

              <div className='read-header-right'>
                <li onClick={this.handleFollowBook}><Button
                    variant="info">{this.state.followbook}</Button>
                </li>
                <li onClick={this.handleFollowAuthor}><Button
                    variant="primary">{this.state.followauthor}</Button>
                </li>
              </div>
            </div>


            <Content />

          </div>

          {/*<div className="content-right"*/}
          {/*style={{marginLeft: "3%", width: "150px"}}>*/}
          {/*/!*<ReadSideBar id={this.state.bookid} author={this.state.author}/>*!/*/}
          {/*</div>*/}

        </div>
    );
  }
}

export default Read;
