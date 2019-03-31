import React, {Component} from 'react';
import HigherLogin from '../higher/HigherLogin';
import CommentListInMessage from "./CommentListInMessage";

class Message extends Component {

  render() {
    return <CommentListInMessage />
  }
}

Message = HigherLogin(Message); // 最外围的是 增加登录验证

export default Message;
