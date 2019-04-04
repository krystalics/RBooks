import React, {Component} from 'react';
import '../../css/mypage.css'
import BookList from "../book/BookList";

class Book extends Component {


  render() {
    // const data={...this.state.data};
    // console.log(data);
    // console.log(this.props.location.state);
    return (
        <div>
          <BookList data={this.props.location.state}/>
        </div>
    );
  }
}

export default Book;
