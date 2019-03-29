import React, { Component } from 'react';


class Settings extends Component {
  render() {
    return (
        <div>
          <span>账户设置</span>
          <hr/>
          <span>选择照片作为头像：</span>
          <input type="file"/>
          <span>邮箱：</span><input type="email"/>
          <span>个人主页：</span><input type="text"/>
          <span>github主页：</span><input type="text"/>
          <span>个人介绍：</span><input type="text"/>
        </div>
    );
  }
}

export default Settings;
