import React, {Component} from 'react';
import axios from 'axios';

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
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleSubmit(event) { //成功之后执行这个方法

    axios.post("http://localhost:8080/user/"+event.target.value,
        {name: this.state.name, password: this.state.password})
    .then(res => {

      if (res.status === 200) {
        this.setState({userid: res.data}); //将返回的id赋给userid
        this.setCookie("userid", this.state.userid, 7); //设置7天的cookie
        this.setLocalStorage(); //把数据顺便缓存到本地
        this.props.history.push("/home"); //登录成功之后 重定向到 home
      }
    });

  }


  render() {
    return (
        <div>

          <div>
            <label htmlFor="name">账号</label>
            <input name="name" value={this.state.name}
                   onChange={this.handleUserInputChange}/>
          </div>
          <div>
            <label htmlFor="password">密码</label>
            <input name="password" value={this.state.password}
                   onChange={this.handlePasswordInputChange}/>
          </div>
          <div>
            <button onClick={this.handleSubmit} value="login">登录</button>
            <button onClick={this.handleSubmit} value="register">注册</button>
          </div>

        </div>
    );
  }
}

export default Login;
