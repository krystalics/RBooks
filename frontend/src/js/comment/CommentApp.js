import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import '../../css/comment.css'
import {_addComment, _deleteComment, _getComments} from '../api';

class CommentApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
  }

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let chapter={...prevProps};
    let newChapter={...this.props};

    if(chapter.chapterid.chaptername!==newChapter.chapterid.chaptername)
      this.getComments();
  }

  async getComments() {
    const res=await _getComments(this.props.chapterid);
    this.setState({comments:res.data});
  }

  async handleSubmitComment(comment) {

    if (!comment) {
      return;
    } // 防止什么都没有输入，就点了发布的情况
    if (!comment.content) {
      return alert("你还没有输入评论内容");
    }
    // 将评论数据压入，，然后重新渲染
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

    await _addComment(newComment);

  }

  async handleDeleteComment(comment){

    let del=window.confirm("确认删除吗！");
    if(!del){
      return;
    }
    let index=this.state.comments.indexOf(comment);
    this.state.comments.splice(index-1,1); //删除该下标的一个元素
    this.setState({
      comments: this.state.comments
    });

    await _deleteComment(comment.commentid);
  }

  render() {
    return (
        <div className="wrapper">
          <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
          <CommentList onDelete={this.handleDeleteComment.bind(this)} data={this.state.comments} author={this.props.author}/>
        </div>
    )
  }
}


export default CommentApp