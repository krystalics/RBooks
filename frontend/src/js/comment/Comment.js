import React, {Component} from 'react';
import ReactJSON from 'react-json-view'
class Comment extends Component {

  render() {
    const data=this.props.data;

    return (
        <div>

          <ReactJSON src={data}/>

        </div>
    );
  }
}

export default Comment;
