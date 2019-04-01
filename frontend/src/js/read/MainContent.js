import React, {Component} from 'react';
import ReactJSON from 'react-json-view'
import CommentList from "../comment/CommentList";

class MainContent extends Component {
  render() {
    return (
        <div>
          <ReactJSON src={this.props.location.state.data.content}/>
          {/*<ReactJSON src={this.props.location.state.data.comments}/>*/}
          <CommentList data={this.props.location.state.data.comments}/>
        </div>
    );
  }
}

export default MainContent;
