import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import {Button, Form} from 'react-bootstrap'
import '../../css/main.css'
import {_updateSettings, _getSettings} from '../api'

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userid: localStorage.getItem('userid'),
      username:'',
      email: '',
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

  async getData(){
    const res=await _getSettings(localStorage.getItem('userid'));
    this.setState({
      username: res.username,
      email: res.email,
      githubpage: res.githubpage,
      homepage: res.homepage,
      selfintroduction: res.selfintroduction,
      photourl: res.photourl,
    })
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
    console.log(this.state);
    const res=await _updateSettings(this.state);
    alert(res.data);
  }

  handleFile(event) {
    // this.setState({file: event.target.file});
  }

  render() {
    return (
        <div>
          <Form.Label>账户设置</Form.Label>
          <hr/>
          <Form.Label>选择照片作为头像：</Form.Label>
          <Form.Control type="file" accept="image/png, image/jpg"
                        onChange={this.handleFile}/>

          <Form.Label>邮箱：</Form.Label>
          <Form.Control type="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        name="email"/>
          <Form.Label>个人主页：</Form.Label>
          <Form.Control type="text"
                        onChange={this.handleInputChange}
                        value={this.state.homepage}
                        name="homepage"/>
          <Form.Label>github主页：</Form.Label>
          <Form.Control type="text"
                        onChange={this.handleInputChange}
                        value={this.state.githubpage}
                        name="githubpage"/>
          <Form.Label>个人介绍：</Form.Label>
          <Form.Control type="text"
                        onChange={this.handleInputChange}
                        value={this.state.selfintroduction}
                        name="selfintroduction"/>
          <hr/>
          <div className="savesettings">
            <Button variant="primary" onClick={this.handleClick} size="lg">保存设置</Button>
          </div>
        </div>
    );
  }
}

Settings = HigherLogin(Settings);

export default Settings;
