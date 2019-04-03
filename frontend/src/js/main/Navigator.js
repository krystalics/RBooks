import React, {Component} from 'react';

import '../../App.css'
import {Button, Form, FormControl, Nav, Navbar,} from 'react-bootstrap';

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
      item = <Nav.Link href="/mypage">{localStorage.getItem("name")}</Nav.Link>;
    } else {
      item = <Nav.Link href="/user/login">登录</Nav.Link>;
    }

    return <div className="Navigator">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand href="/home"> RBooks</Navbar.Brand>
            <Nav.Link href="/settings">设置</Nav.Link>
            <Nav.Link href="/message"> 消息</Nav.Link>
            {item}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-4"/>
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>

  }
}

export default Navigator;