import React, {Component} from 'react';
import Information from "./Information";
import CardNav from "./CardNav";
import Card from "./Card";

// 最终由 Navigator Container Footer 三个组件构成
class Mypage extends Component {
  render() {
    return (
        <div>
          <Information/>
          <CardNav/>
          <Card/>
        </div>
    );
  }
}

export default Mypage;
