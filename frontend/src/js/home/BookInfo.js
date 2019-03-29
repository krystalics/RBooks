import React, {Component} from 'react';

class BookInfo extends Component {

  render() {
    return (
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
    );
  }
}

export default BookInfo;
