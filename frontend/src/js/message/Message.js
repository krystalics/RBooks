import React, {Component} from 'react';
import HigherLogin from '../higher/HigherLogin';
import wrapWithAjaxGetData from '../higher/wrapWithAjaxGetData';

class Message extends Component {

  render() {
    return (
        <div>
          {this.props.data}
        </div>
    );
  }
}


Message = wrapWithAjaxGetData(Message, `message?commentuser=${localStorage.getItem('name')}`); //第二圈，从后台获取数据

Message = HigherLogin(Message); // 最外围的是 增加登录验证

export default Message;
