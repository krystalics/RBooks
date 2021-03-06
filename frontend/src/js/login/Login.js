import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap'
import '../../css/main.css'
import {_login} from '../api'
import {setCookie} from "../CookieService";
import {NavLink} from "react-router-dom";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      userid: '-1'  // 这个用于设置cookie
    };
    this.handleUserInputChange = this.handleUserInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleUserInputChange(e) {
    this.setState({name: e.target.value});
  }

  handlePasswordInputChange(e) {
    this.setState({password: e.target.value});
  }

  setLocalStorage() {
    localStorage.setItem('name', this.state.name); //把用户名name 缓存到本地
    // localStorage.setItem('password', this.state.password);
    localStorage.setItem('userid', this.state.userid);
  }

  checkUserAndPass(username, password) {
    if (username.length < 6 || password.length < 6 || username.length > 20) {
      alert("账号或密码格式不正确");
      return false;
    }
    return true;
  }

  async handleLoginSubmit() {

    const res = await _login(
        {name: this.state.name, password: this.state.password});
    if (res.status === 200) {
      if (res.data !== -1) {
        this.setState({userid: res.data}); //将返回的id赋给userid
        // console.log(res)
        setCookie("userid", this.state.userid, 7); //设置7天的cookie
        this.setLocalStorage(); //把数据顺便缓存到本地
        this.props.history.push("/"); //登录成功之后 重定向到 home
        window.location.reload();

      } else {
        alert("账号或密码错误");
      }
    } else {
      alert("网络错误");
    }

  }

  render() {
    return (
        <div className="Content">
          <div className="content-left"></div>

          <div className="content-middle">
            <div className="mainLogin">
              <Form.Label>账号</Form.Label>
              <Form.Control type="text" value={this.state.name}
                            placeholder="长度至少6位至多20位"
                            onChange={this.handleUserInputChange}/>

              <Form.Label>密码</Form.Label>
              <Form.Control type="password" value={this.state.password}
                            placeholder="长度至少6位"
                            onChange={this.handlePasswordInputChange}/>

              <div className="loginButton">
                <Button variant="outline-success"
                        onClick={this.handleLoginSubmit}
                        size="lg"
                        value="login">登录</Button>
                <NavLink to="/register">
                  <Button variant="outline-primary"

                          size="lg"
                          value="register">注册</Button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="content-right"></div>
        </div>

    )
        ;
  }
}

export default Login;
