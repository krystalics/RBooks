import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../css/comment.css'
import {ListGroupItem} from "react-bootstrap";
import Time from "../Time";

class Comment extends Component {

  _getProcessedContent(content) {
    // return content.replace(/`([\S\s]+?)`/g,`<code></code>`);
    // 将content 中的`` 替换成 <code></code>
    // 这样做会有严重的 Xss漏洞， 所以我们必须要手动把这些HTML标签转义，
    return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&$quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, `<code></code>`);

  }
  //
  // getDate(){
  //   const {data} = this.props;
  //   let date={
  //     year:data.datetime
  //   };
  //   return date;
  // }
  render() {
    const {data} = this.props; //获取评论数据
    let datetime=data.commentid.datetime;  //在用户评论后更新评论列表时
    //用户评论是 时间戳，在这里解析会报错
    // console.log(datetime);
    // datetime=JSON.stringify(datetime);
    // let date=datetime.split("T");
    // let time=date[1].split(".");

    return (
        <ListGroupItem action variant="light">

          <div>
            <span className="comment-user">{data.commentuser}</span>{' '}:
            {/*<Time data={datetime}/>*/}
            {JSON.stringify(datetime)}
          </div>
          <p dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(data.content)
          }}/>

        </ListGroupItem>
    );
  }
}

export default Comment