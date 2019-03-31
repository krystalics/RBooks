import React, {Component} from 'react';
import Comment from "./Comment";
import ReactJSON from 'react-json-view'
class CommentList extends Component {

  data() {
    const data = this.props.data;
    let datas = [];
    if(data===null) return [];
    for (let index in data) {
      let temp;
      if (data[index]===[]||data[index]===undefined) continue;
      temp = {
        bookid: data[index].chapterid.bookid,
        chaptername: data[index].chapterid.chaptername,
        datetime: data[index].datetime,
        commentuser: data[index].commentuser,
        content: data[index].content
      };

      datas.push(temp);
    }

    return datas;
  }

  render() {

    return (
        this.data().map((item, idx) => {
          return <Comment key={idx} data={item}/>
        })
        // <ReactJSON src={this.props.data}/>
    );
  }
}

export default CommentList;
