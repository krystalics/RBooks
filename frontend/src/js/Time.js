import React, {Component} from 'react';
import '../css/content.css'

// 渲染时间的显示，第一个是时间戳，第二个是后台传来的Date
class Time extends Component {

  render() {
    let {data} = this.props; //获取评论数据
    let renderTime = '';

    if (typeof data === "number") { //时间戳是数值型的
      let date = new Date(data); //利用时间戳获取Date对象
      let month="0"+(date.getMonth()+1);
      renderTime = date.getFullYear() + "-" + month + "-"
          + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
          + ":" + date.getSeconds();

    }
    if (typeof data === "string"&&data.indexOf("T")!==-1) { //后台传来的
      let date = data.split("T");
      // console.log(date)
      let time = date[1].split(".");
      // console.log(time)

      renderTime = date[0] + " " + time[0];
      // console.log(renderTime)
    }

    return <span>{renderTime}</span>
  }
}




export default Time