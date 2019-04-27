import React, {Component} from 'react';
import CommentApp from "../comment/CommentApp";
import '../../css/content.css'
import axios from "axios";
import Time from "../Time";

import marked from 'marked';
import hljs from 'highlight.js';
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

var chapterid = {};

class MainContent extends Component {

  constructor(props) {
    super(props);

    // console.log(chapterid)
    this.state = {
      data: '',
      bookid: '',
      chaptername: '',
      commentuser: '',
      content: '',
      datetime: '',

    };
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

  getData() {
    // console.log(this.props)
    if (typeof (this.props.match) === "undefined") {
      return;
    }
    chapterid = {
      bookid: JSON.parse(this.props.match.params.param).bookid,
      chaptername: this.props.match.params.chaptername
    };
    // console.log(chapterid);
    axios.post('http://localhost:8080/read/getchapter', chapterid)
    .then(res => {
      this.setState({data: res.data});
      this.analyse();
    }).catch(res => {
      this.setState({data: "加载错误"});
    });
    // console.log(this.props);

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



  render() {
    let data = {
      bookid: JSON.parse(this.props.match.params.param).bookid,
      chaptername: this.props.match.params.chaptername,
      content:this.state.content
    };
    let time = this.state.datetime;
    let item = "";
    if (this.state.author === localStorage.getItem("name")) {
      item =
          <NavLink to={{
            pathname: '/writing/chapter',
            state:{data}
          }}>
            <Button variant="outline-success">更新章节</Button>
          </NavLink>
    }

    return (
        <div>
          <span className="content-edit">{item}</span>
          <div className="title">
            <span><h3>{this.state.chaptername}</h3></span>

            <span className="title-author">{this.state.author}</span>
            {/*<span className="title-date">{time}</span>*/}
            <span className="title-date"><Time data={time}/></span>

            <hr/>
          </div>

          <div className="content">
            <div
                id="content"
                className="article-detail"
                dangerouslySetInnerHTML={{
                  __html: this.state.content ? marked(this.state.content) : null,
                }}/>
          </div>

          <div className="comment">
            <CommentApp chapterid={chapterid}/>
          </div>
        </div>
    );
  }
}

export default MainContent;
