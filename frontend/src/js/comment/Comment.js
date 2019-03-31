import React, {Component} from 'react';
import ReactJSON from 'react-json-view'
class Comment extends Component {

  render() {
    return (
        <div>
          <ReactJSON src={this.props.data}/>

        </div>
    );
  }
}

export default Comment;
