import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import {Button, Form} from 'react-bootstrap'
import '../../css/main.css'
import {_getSettings, _updateSettings} from '../api'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userid: localStorage.getItem('userid'),
      username: '',
      email: '@qq.com',
      githubpage: '',
      homepage: '',
      selfintroduction: '',
      photourl: '', //这里的照片地址一般不会在前端填写，会在照片传到后台的时候由后台决定它的位置,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    const res = await _getSettings(localStorage.getItem('userid'));

    this.setState({
      username: res.data.username,
      email: res.data.email,
      githubpage: res.data.githubpage,
      homepage: res.data.homepage,
      selfintroduction: res.data.selfintroduction,
      photourl: res.data.photourl,
    });
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

  async handleClick() {
    // console.log(this.state);
    const res = await _updateSettings(this.state);
    alert(res.data);
  }

  handleFile(event) {
    // this.setState({file: event.target.file});
  }

  render() {
    return (
        <div>
          <Form>
            <Form.Label><h5>账户设置</h5></Form.Label>
            <hr/>
            <Form.Group as={Row} controlId="file">
              <Form.Label column sm="2">头像</Form.Label>
              <Col sm="10">
                <Form.Control type="file" accept="image/png, image/jpg"
                              onChange={this.handleFile}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="username">
              <Form.Label column sm="2">用户名</Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly
                              defaultValue={this.state.username}/>
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
                <Form.Control type="text"
                              onChange={this.handleInputChange}
                              value={this.state.selfintroduction}
                              name="selfintroduction"/>
              </Col>
            </Form.Group>
          </Form>
          <hr/>
          <div className="savesettings">
            <Button variant="primary" onClick={this.handleClick}
                    size="lg">保存设置</Button>
          </div>

        </div>
    );
  }
}

Settings = HigherLogin(Settings);

export default Settings;
