import React, {Component} from 'react';
import Information from "./Information";
import CardNav from "./CardNav";
import Card from "./Card";
import HigherLogin from "../higher/HigherLogin";
import wrapWithAjaxGetData from "../higher/wrapWithAjaxGetData";


class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      information: [],
      write_books: [],
      follow_books: [],
      follow_author: [],
      be_followed: []
    }
  }

  render() {
    return (
        <div>
          {this.props.data}
          <Information/>
          <CardNav/>
          <Card/>
        </div>
    );
  }
}

Mypage = wrapWithAjaxGetData(Mypage,
    `mypage?userid=${localStorage.getItem('userid')}`)

Mypage = HigherLogin(Mypage); //验证是否登录

export default Mypage;
