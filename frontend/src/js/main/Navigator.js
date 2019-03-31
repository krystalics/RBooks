import React, {Component} from 'react';
import '../../css/main.css'
import '../../App.css'
import '../../css/menu.css'
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

  getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  checkCookie() {
    let userid = this.getCookie("userid");
    return !(userid === '' || userid === -1);
    //默认是-1  而无该key 则为''
  }

  render() {
    let item;
    if (this.checkCookie()) { //有cookie说明登录成功了，显示我的页面
      // item=<NavLink to="/mypage">我的</NavLink>;
      item = <NavLink to="/mypage">主页</NavLink>
    } else {
      item = <NavLink to="/user/login">登录</NavLink>;
    }

    return <div className="Navigator">
      <ul>
        <li><img src={logo} alt="RBooks"/></li>
        <li><NavLink to="/home"> RBooks</NavLink>
        </li>
        <li><input value={this.state.value} onChange={this.handleChange}
                   placeholder="搜索"/>
        </li>
        <li><NavLink to="/settings">设置</NavLink></li>
        <li><NavLink to="/message"> 消息</NavLink></li>

        <li>{item}</li>

      </ul>

    </div>;
  }
}

export default Navigator;
