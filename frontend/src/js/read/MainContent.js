import React, {Component} from 'react';
import CommentApp from "../comment/CommentApp";
import '../../css/content.css'
import Time from "../Time";

import marked from 'marked';
import hljs from 'highlight.js';
import {_deleteChapter, _getChapter} from "../api"

var chapterid = {};

class MainContent extends Component {

  constructor(props) {
    super(props);

    // console.log(chapterid)
    this.state = {
      data: '',
      author: localStorage.getItem('currentBookAuthor'),
      bookid: localStorage.getItem('currentBookId'),
      chaptername: this.props.match.params.chaptername,
      commentuser: '',
      content: '',
      datetime: ''

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
    this.getData(this.state.chaptername);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (typeof (this.props.match) === "undefined") {
      return;
    }

    let chaptername = prevProps.match.params.chaptername;
    let newChaptername = this.props.match.params.chaptername;

    if (chaptername !== newChaptername) {

      this.getData(newChaptername);
    }
  }

  async getData(chaptername) {
     if (typeof (this.props.match) === "undefined") {
      return;
    }

    chapterid = {
      bookid: this.state.bookid,
      chaptername: chaptername
    };

    // console.log(chapterid)
    const res = await _getChapter(chapterid);
    this.setState({data: res.data});
    this.analyse();
  }

  analyse() {
    const data = this.state.data;
    // console.log(data)
    this.setState({
      chaptername: data.chapterid.chaptername,
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

    let time = this.state.datetime;
    return (
        <div className='mainContent'>

          {/*{item}*/}

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
          <hr/>
          <div className="comment">
            <CommentApp
                author={this.state.author}
                chapterid={chapterid}/>
          </div>

        </div>
    );
  }
}

export default MainContent;
