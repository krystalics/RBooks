import React, { Component } from 'react';
import fetch from 'cross-fetch'
// 最终由 Navigator Container Footer 三个组件构成
class Message extends Component {

  constructor(props){
    super(props);
    this.state={comments:''};
  }

  getData(){  // 从服务端获取数据
    fetch('http://localhost:8080/message',{
      method:'POST'
    }).then(res=>res.json()).then(
        data=>{
          this.setState({comments:data});
        }
    )
  }

  componentWillMount() {
    this.getData(); //在组件要加载的时候，从远程调数据
  }


  render() {
    return (
        <div>
         消息
        </div>
    );
  }
}

export default Message;
