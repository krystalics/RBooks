import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap'
import '../../css/main.css'
import {_login, _register} from '../api'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      userid: -1  // 这个用于设置cookie
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

  setCookie(name, value, days) {
    let expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  setLocalStorage() {
    localStorage.setItem('name', this.state.name); //把用户名name 缓存到本地
    // localStorage.setItem('password', this.state.password);
    localStorage.setItem('userid', this.state.userid);
  }

  checkUserAndPass(username,password){
    if(username.length<6||password.length<6){
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
        this.setCookie("userid", this.state.userid, 7); //设置7天的cookie
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

  async handleRegisterSubmit() {
    if(!this.checkUserAndPass(this.state.name,this.state.password)){
      return;
    }
    const res = await _register(
        {name: this.state.name, password: this.state.password});
    if (res.status === 200) {
      if (res.data !== -1) {
        this.setState({userid: res.data}); //将返回的id赋给userid
        this.setCookie("userid", this.state.userid, 7); //设置7天的cookie
        this.setLocalStorage(); //把数据顺便缓存到本地
        this.props.history.push("/settings"); //登录成功之后 重定向到 home
        window.location.reload();
      } else {
        alert("账号已存在");
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
                            placeholder="长度至少6位"
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
                <Button variant="outline-primary"
                        onClick={this.handleRegisterSubmit}
                        size="lg"
                        value="register">注册</Button>
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
