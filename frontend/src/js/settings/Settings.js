import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import Axios from 'axios';

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
      default:break;
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

  handleFile(event){
    this.setState({file:event.target.file});
  }

  render() {
    return (
        <div>
          <label>账户设置</label>
          <hr/>
          <label>选择照片作为头像：</label>
          <input type="file" accept="image/png, image/jpg" onChange={this.handleFile}/>

          <label>邮箱：</label><input type="email"
                                   onChange={this.handleInputChange}
                                   value={this.state.email} name="email"/>
          <label>个人主页：</label><input type="text"
                                     onChange={this.handleInputChange}
                                     value={this.state.homepage}
                                     name="homepage"/>
          <label>github主页：</label><input type="text"
                                         onChange={this.handleInputChange}
                                         value={this.state.githubpage}
                                         name="githubpage"/>
          <label>个人介绍：</label><input type="text"
                                     onChange={this.handleInputChange}
                                     value={this.state.selfintroduction}
                                     name="selfintroduction"/>
          <button onClick={this.handleClick}>保存设置</button>
        </div>
    );
  }
}

Settings = HigherLogin(Settings)

export default Settings;
