import React, {Component} from 'react';

import '../../App.css'
import {Dropdown, DropdownButton, Nav} from 'react-bootstrap';
// 导航栏由 一个logo 5个按钮和一个搜索框组成，其中点击”我的“按钮 会检测用户是否处于登录状态，如果不是则跳转到登录页面
// 如果不是 ， 则出现下拉框。。mypage和settings
class Navigator extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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


    return !(userid === '' || userid === '-1');
    //默认是-1  而无该key 则为''
  }

  setCookie(name, value, days) {
    let expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  handleLogout() {
    alert('登出');
    this.setCookie('userid',-1);
    localStorage.removeItem('name');
    localStorage.removeItem('userid');
    window.location.reload();
  }

  render() {
    let item;
    // console.log(this.checkCookie());
    if (this.checkCookie()) { //有cookie说明登录成功了，显示我的页面
      // item=<NavLink to="/mypage">我的</NavLink>;
      item =
            <DropdownButton id="dropdown-basic-button" title="我的"
                            variant='link'>
              <Dropdown.Item href="/mypage">
                {localStorage.getItem(
                    "name")}
              </Dropdown.Item>
              <Dropdown.Item href="/settings">
                设置
              </Dropdown.Item>
              <Dropdown.Item href="#"
                             onClick={this.handleLogout}>登出</Dropdown.Item>
            </DropdownButton>

    } else {
      item = <li><Nav.Link href="/user/login">登录</Nav.Link></li>;
    }

    return <div className="Navigator">

      <ul className="Navigator_ul">
        <li><Nav.Link href="/"> RBooks</Nav.Link></li>
        <li><Nav.Link href="/write"> 写书</Nav.Link></li>

        <li><Nav.Link href="/message"> 消息</Nav.Link></li>
        {item}
        <li><Nav.Link
            href="https://github.com/krystalics/rbooks">github</Nav.Link></li>
      </ul>

    </div>

  }
}

export default Navigator;
