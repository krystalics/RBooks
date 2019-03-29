import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class BookInfo extends Component {

  render() {
    const param = {
      author: this.props.data.author,
      bookid: this.props.data.id
    };
    const data = JSON.stringify(param);
    let path=`/read/${data}`;  //传参数过去
    return (
        <NavLink to={path}>
          <div>
            {this.props.data.id}
            {this.props.data.name}
            {this.props.data.author}
            {this.props.data.description}
            {this.props.data.datetime}
            {this.props.data.photourl}
            {this.props.data.love}
            <hr/>
          </div>
        </NavLink>
    );
  }
}

export default BookInfo;
