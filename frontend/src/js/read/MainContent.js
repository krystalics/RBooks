import React, {Component} from 'react';
import CommentApp from "../comment/CommentApp";
import '../../css/content.css'
import Time from "../Time";

import marked from 'marked';
import hljs from 'highlight.js';
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {
  _addFollowAuthor,
  _addFollowBook,
  _deleteChapter, _deleteFollowAuthor, _deleteFollowBook,
  _getChapter,
  _isFollowAuthor,
  _isFollowBook
} from "../api"
import Button from "react-bootstrap/Button";

var chapterid = {};

class MainContent extends Component {

  constructor(props) {
    super(props);

    // console.log(chapterid)
    this.state = {
      data: '',
      author: '',
      bookid: '',
      chaptername: '',
      commentuser: '',
      content: '',
      datetime: '',
      followauthor: "关注作者",
      followbook: "点赞收藏"

    };
    this.handleDeleteChapter = this.handleDeleteChapter.bind(this);
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);
    this.handleFollowBook = this.handleFollowBook.bind(this);

  }

  componentWillMount() {

    marked.setOptions({ //设置markdown相关配置
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
    this.getData();
    this.isFollowBook();
    this.isFollowAuthor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (typeof (this.props.match) === "undefined") {
      return;
    }
    let chaptername = prevProps.match.params.chaptername;
    let newChaptername = this.props.match.params.chaptername;
    if (chaptername !== newChaptername) {
      this.getData();
    }
  }

  async getData() {
    // console.log(this.props)
    if (typeof (this.props.match) === "undefined") {
      return;
    }
    chapterid = {
      bookid: JSON.parse(this.props.match.params.param).bookid,
      chaptername: this.props.match.params.chaptername
    };

    const res = await _getChapter(chapterid);
    this.setState({data: res.data});
    this.analyse();
  }

  analyse() {
    const data = this.state.data;

    this.setState({
      bookid: data.chapterid.bookid,
      chaptername: data.chapterid.chaptername,
      author: JSON.parse(this.props.match.params.param).author,
      content: data.content,
      datetime: data.datetime
    });

  }

  async handleDeleteChapter() {

    let del = window.confirm("是否删除本章节");
    if (!del) {
      return;
    }

    let chapterid = {
      bookid: this.state.bookid,
      chaptername: this.state.chaptername
    };

    const res = await _deleteChapter(chapterid);
    if (res.status === 404) {
      alert(res.data);
    }
    window.history.back(-1);

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

  render() {
    let data = {
      bookid: JSON.parse(this.props.match.params.param).bookid,
      chaptername: this.props.match.params.chaptername,
      content: this.state.content
    };
    let time = this.state.datetime;
    let item = undefined;

    if (this.state.author === localStorage.getItem("name")) {
      item =
          <div className="editchapter">
            <li>
              <NavLink to={{
                pathname: '/writing/chapter',
                state: {data}
              }}><Button variant="outline-success">更新章节 </Button></NavLink>
            </li>
            <li>
              <Button variant="danger"
                      onClick={this.handleDeleteChapter}>删除章节</Button>
            </li>
            <li>
              <NavLink to={{
                pathname: '/writing/chapter',
                state: {data}
              }}><Button variant="outline-success">
                增加章节</Button>
              </NavLink>
            </li>

          </div>
    } else {
      item = <div className="editchapter">
        <li onClick={this.handleFollowBook}><Button
            variant="info">{this.state.followbook}</Button>
        </li>
        <li onClick={this.handleFollowAuthor}><Button
            variant="primary">{this.state.followauthor}</Button>
        </li>
      </div>
    }

    return (
        <div>
          {item}

          <div className="title">
            <span><h3>{this.state.chaptername}</h3></span>

            <span className="title-author">{this.state.author}</span>
            {' '}
            <span className="title-date"><Time data={time}/></span>

            <hr/>
          </div>

          <div>
            <div
                id="content"
                className="article-detail"
                dangerouslySetInnerHTML={{
                  __html: this.state.content ? marked(this.state.content)
                      : null,
                }}/>
          </div>

          <div className="comment">
            <CommentApp
                author={JSON.parse(this.props.match.params.param).author}
                chapterid={chapterid}/>
          </div>

          <hr/>


        </div>
    );
  }
}

export default MainContent;
