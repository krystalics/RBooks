import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ReactJSON from 'react-json-view'
class Directory extends Component {

  render() {
    let data={
      content:this.props.content,
      comments:this.props.comments
    };
    return (
        <div>
          {/*<ReactJSON src={this.props.content}/>*/}
          <NavLink to={{
            pathname: `/read/${this.props.chapterid}/content/${this.props.data.name}`,
            state: {data}
          }}>{this.props.data.name}</NavLink>
        </div>
    );
  }
}

export default Directory;
