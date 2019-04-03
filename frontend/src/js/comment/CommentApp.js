import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import '../../css/comment.css'
import axios from "axios";

class CommentApp extends Component {

  constructor() {
    super();
    this.state = {
      comments: [],
    }
  }

  componentWillMount() {
    this.getComments();
  }

  getComments() {
    return axios.get(
        'http://localhost:8080/read/getAllcomments?bookid='
        + this.props.bookid).then(res => {
            this.setState({comments:res.data})
    }).catch(res=>{
      this.setState({comments:res.data});
    });
  }



  handleSubmitComment(comment) {
    // console.log(comment);  // 一开始证明数据已经到了 CommentApp

    if (!comment) {
      return;
    } // 防止什么都没有输入，就点了发布的情况
    if (!comment.username) {
      return alert("你还没有输入用户名");
    }
    if (!comment.content) {
      return alert("你还没有输入评论内容");
    }
    // 将评论数据压入，，然后重新渲染

    this.state.comments.push(comment); // 这里直接改变了 state，但是具体的原因有兴趣可以看 官方文档


    this.setState({
      comments: this.state.comments
    })
  }



  render() {
    return (
        <div className="wrapper">
          <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
          <CommentList data={this.state.comments}/>
        </div>
    )
  }
}

export default CommentApp