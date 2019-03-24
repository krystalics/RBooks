import React, { Component } from 'react';
import BookList from "./BookList";


// 最终由 Navigator Container Footer 三个组件构成
class Home extends Component {
  render() {
    return (
        <div>
          <BookList/>
        </div>
    );
  }
}

export default Home;
