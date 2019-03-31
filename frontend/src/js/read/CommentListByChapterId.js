import React, {Component} from 'react';
import wrapWithAjaxPostData from "../higher/wrapWithAjaxPostData";
import CommentList from "../comment/CommentList";

class CommentListByChapterId extends Component {

  render() {
    return <CommentList data={this.props.data}/>
  }
}

CommentListByChapterId = wrapWithAjaxPostData(CommentListByChapterId,
    'read/getcomments', {
      bookid: 1,
      chaptername: "第一章"
    });
export default CommentListByChapterId;
