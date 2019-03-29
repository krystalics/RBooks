import React, {Component} from 'react';
import wrapWithAjaxGetData from '../higher/wrapWithAjaxGetData';
import BookInfo from "./BookInfo";

class BookList extends Component {

  data() {
    const data = this.props.data;
    let datas = [];
    for (let index in data) {
      let temp;
      temp = {
        id: data[index].id,
        name: data[index].name,
        author: data[index].author,
        description: data[index].description,
        datetime: data[index].datetime,
        photourl: data[index].photourl,
        love: data[index].love
      };

      datas.push(temp);
    }

    return datas;
  }

  render() {

    return (
        this.data().map((item, idx) => {
          return <BookInfo key={idx} data={item}/>
        })
    );
  }
}

BookList = wrapWithAjaxGetData(BookList, 'home');
export default BookList;
