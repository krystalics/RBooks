import React, {Component} from 'react';
import wrapWithAjaxGetData from '../higher/wrapWithAjaxGetData';
import CommentList from "../comment/CommentList";

class CommentListInMessage extends Component {

  render() {
    return <CommentList data={this.props.data}/>
  }
}

CommentListInMessage = wrapWithAjaxGetData(CommentListInMessage,`message?commentuser=${localStorage.getItem('name')}`);
export default CommentListInMessage;
