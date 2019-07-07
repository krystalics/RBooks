import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import '../../css/mypage.css'
import Page from "./Page";
import {_getMypage} from '../api'
import Spinner from "../comment/CommentApp";

class MyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      loading: false
    }
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
  }

  async getData() {
    const res = await _getMypage();
    // console.log(res);
    this.setState({data: res.data})
  }

  render() {

    return (
        this.state.loading ?
            <Page param="mypage" data={this.state.data}/> :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
    );
  }
}

MyPage = HigherLogin(MyPage); //验证是否登录

export default MyPage;
