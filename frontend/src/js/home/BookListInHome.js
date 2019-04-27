import React, {Component} from 'react';
import wrapWithAjaxGetData from '../higher/wrapWithAjaxGetData';
import BookList from "../book/BookList";

class BookListInHome extends Component {



  render() {
    return <BookList data={this.props.data}/>
  }
}

BookListInHome = wrapWithAjaxGetData(BookListInHome, 'home');
export default BookListInHome;
