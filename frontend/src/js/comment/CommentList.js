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

    return datas;
  }

  render() {

    return (
        <ListGroup>
        {this.data().map((item, idx) => {
          return <Comment key={idx} data={item}/>
        })}

        </ListGroup>
    );
  }
}

export default CommentList;
