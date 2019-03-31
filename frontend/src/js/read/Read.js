import React, {Component} from 'react';
import axios from "axios";
import ChapterList from "./ChapterList";
import MainContent from "./MainContent";
import {Route} from 'react-router-dom'
import CommentListByChapterId from "./CommentListByChapterId";
// 由三个组件构成，目录 主要内容 评论列表
// 这里的 CommentList和之前Message中的不一样，这里是需要根据 Chapterid 来确定评论的，而之前的是经过高级组件固定化的

class Read extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookid: JSON.parse(this.props.match.params.data).bookid,
      directory: [],
      data: [],
      contents: []
    }
  }

  // getBook(){
  //   return axios.get('http://localhost:8080/read/getbook?bookid=' + this.state.bookid);
  // }
  //
  // getComments(){
  //   return axios.post('http://localhost:8080/read/getcomments',{
  //     bookid: 1,
  //     chaptername: "第一章"
  //   });
  // }

  componentWillMount() { //获得数据
    axios.get('http://localhost:8080/read/getbook?bookid=' + this.state.bookid)
    .then(res => {
      // alert(JSON.stringify(res.data));  确实有数据
      this.setState({data: res.data});
      this.data(); //保证是在获取之后渲染
    }).catch(res => {
      this.setState({data: "加载错误"})
    })
  }

  data() {
    const data = this.state.data;
    const author = JSON.parse(this.props.match.params.data).author;
    let contents = [];
    let directory = [];
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
    this.setState({directory: directory, contents: contents}); //更新目录和内容

  }

  // 先渲染目录和 第一章的内容  ,然后绑定目录和内容的更新关系
  render() {
    return (
        <div>

          <ChapterList data={this.state.directory}
                       chapterid={this.props.match.params.data}
                       contents={this.state.contents}/>
          <div>
            <Route path="/read/:data/content/:chaptername"
                   component={MainContent}/>
          </div>


        </div>
    );
  }
}

export default Read;
