import React, {Component} from 'react';
import Comment from "./Comment";
import {ListGroup} from 'react-bootstrap'

class CommentList extends Component {

  data() {
    const data = this.props.data;
    // console.log(data); //数据正常
    let datas = [];
    if (data === undefined) {
      return [];
    }
    for (let index in data) {
      let temp;
      // console.log(data[index]);
      if (data[index] === [] || data[index] === undefined) {
        continue;
      }
      temp = {
        commentid: {
          bookid: data[index].commentid.bookid,
          chaptername: data[index].commentid.chaptername,
          datetime: data[index].commentid.datetime,
        },
        commentuser: data[index].commentuser,
        content: data[index].content
      };

      datas.push(temp);
    }
    datas = datas.reverse(); //最新增加的评论显示在上层，所以需要 reverse
    return datas;
  }

  render() {

    return (
        <ListGroup>
          {this.data().map((item, idx) => {
            return <Comment key={idx} data={item} onDelete={this.props.onDelete}
                            author={this.props.author}/>
          })}
        </ListGroup>
    );
  }
}

export default CommentList;
