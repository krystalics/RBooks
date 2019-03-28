import React, { Component } from 'react';
import HigherLogin from "../higher/HigherLogin";

// 最终由 Navigator Container Footer 三个组件构成
class Write extends Component {
  render() {
    return (
        <div>
          写书页面
        </div>
    );
  }
}

Write = HigherLogin(Write);
export default  Write;
