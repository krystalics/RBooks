import React, {Component} from 'react';


// 渲染时间的显示，第一个是时间戳，第二个是后台传来的Date
class Time extends Component {

  render() {
    let {datetime} = this.props; //获取评论数据
      //在用户评论后更新评论列表时
    //用户评论是 时间戳，在这里解析会报错
    // console.log(datetime);
    let renderTime = '';
    if (typeof datetime==="string") { //
      let date = datetime.split("T");
      let time = date[1].split(".");
      renderTime = date[0] + " " + time[0];
    } else {
      renderTime = JSON.stringify(datetime)
    }

    return <span>{renderTime}</span>
  }
}

export default Time