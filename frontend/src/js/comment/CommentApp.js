import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import '../../css/comment.css'
import axios from "axios";
import HigherLogin from "../higher/HigherLogin";

class CommentApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
  }

  componentWillMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let chaptername=prevProps.chapterid.chaptername;
    let newChaptername=this.props.chapterid.chaptername;
    if(chaptername!==newChaptername) this.getComments();
  }

  getComments() {
    // console.log(this.props)
    return axios.post('http://localhost:8080/read/getcomments', this.props.chapterid)
    .then(
        res => {
          // console.log(res.data);
          this.setState({comments: res.data})
        }).catch(res => {
      this.setState({comments: res.data});
    });
  }

  handleSubmitComment(comment) {
    // console.log(comment);  // 一开始证明数据已经到了 CommentApp

    if (!comment) {
      return;
    } // 防止什么都没有输入，就点了发布的情况
    if (!comment.content) {
      return alert("你还没有输入评论内容");
    }
    // 将评论数据压入，，然后重新渲染

    // let datetime=comment.date;
    // console.log(comment.datetime);
    let newComment={
      commentid:{
        bookid:this.props.chapterid.bookid,
        chaptername:this.props.chapterid.chaptername,
        datetime:comment.datetime
      },
      commentuser:localStorage.getItem('name'),
      content:comment.content,
    };
    this.state.comments.push(newComment); // 这里直接改变了 state，但是具体的原因有兴趣可以看 官方文档

    this.setState({
      comments: this.state.comments
    });

    axios.post('http://localhost:8080/read/addcomment',newComment)
    .then(res=>{
      // alert(res.data);
    }).catch(err=>{
      alert(err.data)
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

CommentApp = HigherLogin(CommentApp);

export default CommentApp