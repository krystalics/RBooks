import React, { Component } from 'react';
import BookInfo from "./BookInfo";

// 最终由 Navigator Container Footer 三个组件构成
class BookList extends Component {

  constructor(props){
    super(props);
    this.state={books:''};
  }

  getData(){  // 从服务端获取数据
    fetch('http://localhost:8080/home',{
      method:'GET'
    }).then(res=>res.text()).then(
        data=>{
          this.setState({books:data});
        }
    )
  }

  componentWillMount() {
    this.getData(); //在组件要加载的时候，从远程调数据
  }

  render() {
    return (
        <div>
          {this.state.books}
          <BookInfo/>
        </div>
    );
  }
}

export default BookList;
