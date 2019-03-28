import React, {Component} from 'react';
import BookInfo from './BookInfo';
import wrapWithAjaxGetData from '../higher/wrapWithAjaxGetData';

class BookList extends Component {


  render() {
    return (
        <div>
          {this.props.data}
          <BookInfo/>
        </div>
    );
  }
}
BookList = wrapWithAjaxGetData(BookList,'home');
export default BookList;
