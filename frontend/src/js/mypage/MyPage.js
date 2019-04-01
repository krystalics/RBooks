import React, {Component} from 'react';
import Information from "./Information";
import HigherLogin from "../higher/HigherLogin";
import wrapWithAjaxGetData from "../higher/wrapWithAjaxGetData";
import BookList from './../book/BookList'
import ReactJSON from 'react-json-view'

class MyPage extends Component {

  render() {
    return (
        <div>

          <br/>
          个人信息
          <Information data={this.props.data.information}/>
          <br/>
          作品集
          <BookList data={this.props.data.bookList_write}/>
          <br/>
          收藏书单
          <BookList data={this.props.data.bookList_follow}/>
          <br/>
          关注
          <ReactJSON src={this.props.data.userList_follow} />
          <br/>
          被谁关注
          <ReactJSON src={this.props.data.userList_be_followed} />


        </div>
    );
  }
}

MyPage = wrapWithAjaxGetData(MyPage,
    `mypage?userid=${localStorage.getItem('userid')}`)

MyPage = HigherLogin(MyPage); //验证是否登录

export default MyPage;
