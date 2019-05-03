import React, {Component} from 'react';
import HigherLogin from '../higher/HigherLogin';
import {_getCommentsByUserName} from '../api'
import CommentList from "../comment/CommentList";

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    const res = await _getCommentsByUserName();
    this.setState({data: res.data})
  }

  render() {

    return (
        <div className="Content">
          <div className="content-left"></div>
          <div className="content-middle">
            迄今为止发过的评论:
            <CommentList data={this.state.data}/>
          </div>
          <div className="content-right"></div>

        </div>
    )
  }
}

Message = HigherLogin(Message); // 最外围的是 增加登录验证

export default Message;
