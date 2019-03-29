import React, {Component} from 'react';
import wrapWithAjaxGetData from '../higher/wrapWithAjaxGetData';
import Comment from "./Comment";


class CommentListByChapterId extends Component {

  data() {
    const data = this.props.data;
    let datas = [];
    if(data===null) return [];
    for (let index in data) {
      let temp;
      temp = {
        bookid: data[index].chapterid.bookid,
        chaptername: data[index].chapterid.chaptername,
        author: data[index].author,
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
    );
  }
}

CommentListByChapterId = wrapWithAjaxGetData(CommentListByChapterId,`message?commentuser=${localStorage.getItem('name')}`);
export default CommentListByChapterId;
