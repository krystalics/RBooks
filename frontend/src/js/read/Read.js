import React, {Component} from 'react';
import DirectoryList from "./DirectoryList";
import {
  _addFollowAuthor,
  _deleteFollowAuthor,
  _getDirectory,
  _isFollowAuthor
} from '../api'
import '../../css/main.css'
import Button from "react-bootstrap/Button";
import NavLink from "react-bootstrap/NavLink";
import {checkCookie} from "../CookieService";
import MainContent from "./MainContent";
import {Route} from "react-router-dom";
import Spinner from "../mypage/MyPage";

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
      loading: false
    };
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);

  }

  componentWillMount() {
    this.getData();
    this.isFollowAuthor();
  }

  componentDidMount() {
    this.setState({loading: true})
  }

  async getData() {
    const res = await _getDirectory(this.state.bookid);
    // console.log(res.data); //之前是因为没有权限 和被拦截了
    this.setState({directory: res.data});
  }

  handleStyleChange() {
    if (this.state.style === this.styleOut) {
      this.setState({style: this.styleIn})
    } else {
      this.setState({style: this.styleOut})
    }
  }

  async isFollowAuthor() {
    if (localStorage.getItem('userid') === null) {
      return
    }
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

  async handleFollowAuthor() { //需要authorid 和 userid
    if (!checkCookie()) {
      alert("你还没有登录，请先登录");
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
        this.state.loading ?
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
                    <li onClick={this.handleFollowAuthor}><Button
                        variant="primary">{this.state.followauthor}</Button>
                    </li>
                  </div>
                </div>


                <Route path="/read/:bookname/:chaptername"
                       component={MainContent}/>

              </div>

            </div> :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
    );
  }
}

export default Read;
