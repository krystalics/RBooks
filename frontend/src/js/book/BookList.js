import React, {Component} from 'react';
import BookInfo from "./BookInfo";
import ListGroup from "react-bootstrap/ListGroup";

// 没经过高阶组件获取数据，可以为多个路径服务
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
        <ListGroup>
          {this.data().map((item, idx) => {
            return <BookInfo key={idx} data={item}/>
          })}
        </ListGroup>
    );
  }
}

export default BookList;
