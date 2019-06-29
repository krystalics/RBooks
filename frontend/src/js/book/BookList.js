import React, {Component} from 'react';
import BookInfo from "./BookInfo";
import ListGroup from "react-bootstrap/ListGroup";

// 没经过高阶组件获取数据，可以为多个路径服务
class BookList extends Component {

  render() {
    const data=this.props.data;
    // 加这个判断是因为 在加载的时候，后端数据还没进来，组件开始渲染，碰到下面data.map会报错，cannot read property map..
    // 所以加个判断防止组件渲染出错，导致后续数据进来也没用
    if(data==='暂无数据'||data===undefined){
      return '暂无数据'
    }
    // console.log(data)
    return (
        <ListGroup>
          {data.map((item, idx) => {
            return <BookInfo onDeleteBook={this.props.onDeleteBook} key={idx} data={item}/>
          })}
        </ListGroup>
    );
  }
}

export default BookList;
