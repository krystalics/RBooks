import React, {Component} from 'react';
import CommentApp from "../comment/CommentApp";
import '../../css/content.css'
import Time from "../Time";

import marked from 'marked';
import hljs from 'highlight.js';
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {_deleteChapter, _getChapter} from "../api"

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

    };
    this.handleDeleteChapter = this.handleDeleteChapter.bind(this);
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
    this.getData()
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

  render() {
    let data = {
      bookid: JSON.parse(this.props.match.params.param).bookid,
      chaptername: this.props.match.params.chaptername,
      content: this.state.content
    };
    let time = this.state.datetime;
    let item = undefined;

    if (this.state.author === localStorage.getItem("name")) {
      item = <div className="editchapter">
        <ListGroup>
          <li>
            <ListGroup.Item variant="success" action>
              <NavLink to={{
                pathname: '/writing/chapter',
                state: {data}
              }} variant="none">更新章节</NavLink>
            </ListGroup.Item>
          </li>
          <li>
            <ListGroup.Item variant="danger" action
                            onClick={this.handleDeleteChapter}>删除章节</ListGroup.Item>
          </li>
        </ListGroup>
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

          <div className="comment" >
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
