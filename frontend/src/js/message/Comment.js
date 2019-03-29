import React, {Component} from 'react';

class Comment extends Component {

  render() {
    return (
        <div>
          {this.props.data.bookid}
          {this.props.data.chaptername}
          {this.props.data.datetime}
          {this.props.data.commentuser}
          {this.props.data.content}
          <hr/>
        </div>
    );
  }
}

export default Comment;
