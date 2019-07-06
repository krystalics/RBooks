import React, {Component} from 'react';

import {_register} from "../api";
import {setCookie} from "../CookieService";
import {Button, Col, Form, Row} from "react-bootstrap";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      userid: '-1',  // 这个用于设置cookie
      email: '例如...@qq.com',
      githubpage: '',
      homepage: '',
      selfintroduction: '',
      photourl: '',
    };
    this.handleUserInputChange = this.handleUserInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleInputChange(event) {

    switch (event.target.name) {
      case 'email':
        this.setState({email: event.target.value});
        break;
      case 'homepage':
        this.setState({homepage: event.target.value});

        break;
      case 'githubpage':
        this.setState({githubpage: event.target.value});

        break;
      case 'selfintroduction':
        this.setState({selfintroduction: event.target.value});
        break;
      default:
        break;
    }
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

  async handleRegisterSubmit() {
    if (!this.checkUserAndPass(this.state.name, this.state.password)) {
      return;
    }
    const res = await _register(this.state);
    if (res.status === 200) {
      if (res.data !== -1) {
        this.setState({userid: res.data}); //将返回的id赋给userid
        setCookie("userid", this.state.userid, 7); //设置7天的cookie
        this.setLocalStorage(); //把数据顺便缓存到本地
        this.props.history.push("/"); //登录成功之后 重定向到 home
        window.location.reload();
      } else {
        alert("账号已存在");
      }
    } else {
      alert("网络错误");
    }

    // await _updateSettings(state);

  }

  render() {
    return (
        <div className="Content">
          <div className="content-left"></div>

          <div className="content-middle">

            <h5>注册账号</h5>
            <br/>
            <Form>
              <Form.Group as={Row} controlId="name">
                <Form.Label column sm="2">账号</Form.Label>
                <Col sm='10'>
                  <Form.Control type="text" value={this.state.name}
                                placeholder="长度至少6位至多20位"
                                onChange={this.handleUserInputChange}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>密码</Form.Label>
                <Col sm='10'>
                  <Form.Control type="password" value={this.state.password}
                                placeholder="长度至少6位"
                                onChange={this.handlePasswordInputChange}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="file">
                <Form.Label column sm="2">头像</Form.Label>
                <Col sm="10">
                  <Form.Control type="file" accept="image/png, image/jpg"
                                onChange={this.handleFile}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="2">邮箱</Form.Label>
                <Col sm="10">
                  <Form.Control type="email"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="homepage">
                <Form.Label column sm="2">个人主页</Form.Label>
                <Col sm="10">
                  <Form.Control type="text"
                                onChange={this.handleInputChange}
                                value={this.state.homepage}
                                name="homepage"/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="githubpage">
                <Form.Label column sm="2">github</Form.Label>
                <Col sm="10">
                  <Form.Control type="text"
                                onChange={this.handleInputChange}
                                value={this.state.githubpage}
                                name="githubpage"/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="self">
                <Form.Label column sm="2">个人介绍</Form.Label>
                <Col sm="10">
                  <Form.Control as="textarea"
                                onChange={this.handleInputChange}
                                value={this.state.selfintroduction}
                                name="selfintroduction"/>
                </Col>
              </Form.Group>
            </Form>
            <hr/>

            <Button variant="primary" onClick={this.handleRegisterSubmit}
                    size="lg">注册</Button>
          </div>
          <div className="content-right"></div>
        </div>

    )
        ;
  }
}

export default Register;