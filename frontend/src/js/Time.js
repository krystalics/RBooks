import React, {Component} from 'react';
import '../css/content.css'
// 渲染时间的显示，第一个是时间戳，第二个是后台传来的Date
class Time extends Component {

  render() {
    let {data} = this.props; //获取评论数据
    //在用户评论后更新评论列表时
    //用户评论是 时间戳，在这里解析会报错
    // console.log(datetime);
    let renderTime = '';
    // console.log(data instanceof Number);
    // console.log(data instanceof String);
    // console.log(typeof data)
    // console.log(data);
    if (typeof data === "number") { //时间戳是数值型的
      let date = new Date(data); //利用时间戳获取Date对象
      // console.log(renderTime)
      renderTime = date.getFullYear() + "-" + date.getMonth() + 1 + "-"
          + date.getDay() + " " + date.getHours() + ":" + date.getMinutes()
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

    return <span className="title-date">{renderTime}</span>
  }
}

export default Time