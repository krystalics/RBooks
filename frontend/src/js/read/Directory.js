import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ReactJSON from 'react-json-view'
class Directory extends Component {

  render() {

    return (
        <div>
          {/*<ReactJSON src={this.props.content}/>*/}
          <NavLink to={{
            pathname: `/read/${this.props.chapterid}/content/${this.props.data.name}`,
            state: this.props.content
          }}>{this.props.data.name}</NavLink>
        </div>
    );
  }
}

export default Directory;
