import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import wrapWithAjaxGetData from "../higher/wrapWithAjaxGetData";
import '../../css/mypage.css'
import Page from "./Page";

class MyPage extends Component {

  render() {
    // console.log(this.props);
    return (
        <Page param="mypage" data={this.props.data}/>
    );
  }
}

MyPage = wrapWithAjaxGetData(MyPage,
    `mypage?userid=${localStorage.getItem('userid')}`);

MyPage = HigherLogin(MyPage); //验证是否登录

export default MyPage;
