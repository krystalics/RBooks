import React, {Component} from 'react';
import Information from "./Information";
import Card from "./Card";
import HigherLogin from "../higher/HigherLogin";
import wrapWithAjaxGetData from "../higher/wrapWithAjaxGetData";
import BookList from "../home/BookList";

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      information: [],
      bookList_write: [],
      bookList_follow: [],
      userList_follow: [],
      userList_be_followed: []
    }
  }

  getData() {
    this.setState({
      information: this.props.data.information,
      bookList_write: this.props.data.bookList_write,
      bookList_follow: this.props.data.bookList_follow,
      userList_follow: this.props.data.userList_follow,
      userList_be_followed: this.props.data.userList_be_followed
    });
  }

  render() {
    return (
        <div>
    
          <Information data={this.state.information}/>

          <BookList data={this.state.bookList_write}/>
          <BookList data={this.state.bookList_follow}/>
          <Card data={this.state.userList_follow}/>
          <Card data={this.state.userList_be_followed}/>
        </div>
    );
  }
}

Mypage = wrapWithAjaxGetData(Mypage,
    `mypage?userid=${localStorage.getItem('userid')}`)

Mypage = HigherLogin(Mypage); //验证是否登录

export default Mypage;
