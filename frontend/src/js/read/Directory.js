import React, { Component } from 'react';
import {NavLink} from "react-router-dom";


class Directory extends Component {

  render() {

    return (
        <div>
          <NavLink to={`/read/${this.props.chapterid}/content/${this.props.data.name}`}>{this.props.data.name}</NavLink>
        </div>
    );
  }
}

export default Directory;
