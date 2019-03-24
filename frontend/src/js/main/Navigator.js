import React, {Component} from 'react';
import '../../css/main.css'
import '../../App.css'
import logo from '../../img/logo.png'
import {NavLink} from "react-router-dom";

// 导航栏由 一个logo 5个按钮和一个搜索框组成，其中点击”我的“按钮 会检测用户是否处于登录状态，如果不是则跳转到登录页面
// 如果不是 ， 则出现下拉框。。mypage和settings
class Navigator extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (

        <div className="Navigator">
          <ul>
            <li><img src={logo} alt="RBooks"/></li>
            <li><NavLink to="/home" activeClassName="selected"> RBooks</NavLink>
            </li>

            <li><NavLink to="/write"> 写书</NavLink></li>
            <li><NavLink to="/message"> 消息</NavLink></li>
            <li><NavLink to="/mypage">我的</NavLink></li>
            <li><input value={this.state.value} onChange={this.handleChange}
                       placeholder="搜索"/>
            </li>
          </ul>

        </div>

    );
  }
}

export default Navigator;
