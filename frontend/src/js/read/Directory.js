import React, { Component } from 'react';


class Directory extends Component {
  render() {
    return (
        <div>
          {this.props.data.name}
        </div>
    );
  }
}

export default Directory;
