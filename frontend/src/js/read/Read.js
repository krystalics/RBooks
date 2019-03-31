import React, {Component} from 'react';
import axios from "axios";
import ChapterList from "./ChapterList";
import MainContent from "./MainContent";
import {Route} from 'react-router-dom'
// 由三个组件构成，目录 主要内容 评论列表
// 这里的 CommentList和之前Message中的不一样，这里是需要根据 Chapterid 来确定评论的，而之前的是经过高级组件固定化的

class Read extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookid: JSON.parse(this.props.match.params.data).bookid,
      directory: [],
      data: [],
      contents: [],
      comments: []
    }
  }

  getBook() {
    return axios.get(
        'http://localhost:8080/read/getbook?bookid=' + this.state.bookid);
  }

  getComments() {
    return axios.get(
        'http://localhost:8080/read/getAllcomments?bookid=' + this.state.bookid);
  }

  componentWillMount() { //获得数据
    // axios.get('http://localhost:8080/read/getbook?bookid=' + this.state.bookid)
    // .then(res => {
    //   // alert(JSON.stringify(res.data));  确实有数据
    //   this.setState({data: res.data});
    //   this.data(); //保证是在获取之后渲染
    // }).catch(res => {
    //   this.setState({data: "加载错误"})
    // });

    axios.all([this.getBook(), this.getComments()]).then(
        axios.spread((res1, res2) => {
          // alert(JSON.stringify(res2.data)); 评论正常获取
          this.setState({data: res1.data, comments: res2.data});
          this.getData(); //保证是在获取之后渲染
        })).catch((res1, res2) => {
      this.setState({data: "加载错误", comments: "加载错误"})
    });
  }

  getData() {
    const data = this.state.data;
    const comments = this.state.comments;
    const author = JSON.parse(this.props.match.params.data).author;
    let contents = [];
    let directory = [];
    let commentList = [];
    if (data === null) {
      return [];
    }
    for (let index in data) {
      let temp;
      temp = {

        bookid: data[index].chapterid.bookid,
        chaptername: data[index].chapterid.chaptername,
        author: author,
        datetime: data[index].datetime,
        content: data[index].content
      };
      directory.push({name: data[index].chapterid.chaptername});
      contents.push(temp);
    }
    for (let index in comments) {
      let temp;
      temp = {
        bookid: comments[index].chapterid.bookid,
        chaptername: comments[index].chapterid.chaptername,
        commentuser: comments[index].commentuser,
        datetime: comments[index].datetime,
        content: comments[index].content
      };
      commentList.push(temp);
    }
    // alert(JSON.stringify(commentList))  正常解析评论

    this.setState(
        {directory: directory, contents: contents, comments: commentList}); //更新目录和内容

  }

  // 先渲染目录和 第一章的内容  ,然后绑定目录和内容的更新关系
  render() {
    return (
        <div>

          <ChapterList data={this.state.directory}
                       chapterid={this.props.match.params.data}
                       contents={this.state.contents}
                       comments={this.state.comments}/>
          <div>
            <Route path="/read/:data/content/:chaptername"
                   component={MainContent}/>

          </div>


        </div>
    );
  }
}

export default Read;
