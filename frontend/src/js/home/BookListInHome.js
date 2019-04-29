import React,{Component} from 'react';
import BookList from "../book/BookList";

class BookListInHome extends Component{
  render() {
    let item;
    if(this.props.data==="暂无更多数据"){
      item=<div className="nodata">暂无更多数据</div>
    }else {
      item=<BookList data={this.props.data}/>
    }
    return item;
  }
}

export default BookListInHome;