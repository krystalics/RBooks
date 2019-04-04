import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import Axios from 'axios';
import {Button, Form} from 'react-bootstrap'
import '../../css/main.css'

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userid: localStorage.getItem('userid'),
      username: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      githubpage: localStorage.getItem('githubpage'),
      homepage: localStorage.getItem('homepage'),
      selfintroduction: localStorage.getItem('selfintroduction'),
      photourl: '', //这里的照片地址一般不会在前端填写，会在照片传到后台的时候由后台决定它的位置,
      // file:null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleFile=this.handleFile.bind(this);
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

  handleClick() {
    // 先将该信息缓存到本地
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("githubpage", this.state.githubpage);
    localStorage.setItem("homepage", this.state.homepage);
    localStorage.setItem("selfintroduction", this.state.selfintroduction);

    // const data={
    //   "information":{
    //     userid: this.state.userid,
    //     username: this.state.username,
    //     email: this.state.email,
    //     githubpage: this.state.githubpage,
    //     homepage: this.state.homepage,
    //     selfintroduction: this.state.selfintroduction,
    //     photourl: '', //这里的照片地址一般不会在前端填写，会在照片传到后台的时候由后台决定它的位置,
    //   },
    //   "file":this.state.file
    // };

    // let param=new FormData();
    // param.append("userid",this.state.userid);
    // param.append("username",this.state.username);
    // param.append("email",this.state.email);
    // param.append("githubpage",this.state.githubpage);
    // param.append("homepage",this.state.homepage);
    // param.append("selfintroduction",this.state.selfintroduction);
    // param.append("photourl",this.state.photourl);
    // param.append("file",this.state.file);
    //
    // let config = {
    //   //添加请求头
    //   headers: { "Content-Type": "multipart/form-data" },
    //   //添加上传进度监听事件
    //   onUploadProgress: e => {
    //     this.progress = ((e.loaded / e.total * 100) | 0) + "%";
    //   }
    // };

    Axios.post('http://localhost:8080/settings', this.state)  //数据就是整个state
    .then(res => {
      alert(res.data);
    }).catch(res => {
      alert(res.data);
    });

  }

  handleFile(event) {
    this.setState({file: event.target.file});
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
