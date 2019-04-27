import React, {Component} from 'react';
import HigherLogin from '../higher/HigherLogin';
import CommentListInMessage from "./CommentListInMessage";
import '../../css/comment.css'
class Message extends Component {

  render() {

    return (
        <div>
          迄今为止发过的评论:
          <CommentListInMessage />
        </div>
        )
  }
}

Message = HigherLogin(Message); // 最外围的是 增加登录验证

export default Message;
