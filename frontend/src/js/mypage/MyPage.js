import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import '../../css/mypage.css'
import Page from "./Page";
import {_getMypage} from '../api'

class MyPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:''
    }
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    const res = await _getMypage();
    // console.log(res)
    this.setState({data:res.data})
  }

  render() {

    return (
        <Page param="mypage" data={this.state.data}/>
    );
  }
}

MyPage = HigherLogin(MyPage); //验证是否登录

export default MyPage;
