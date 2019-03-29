import React, { Component } from 'react';


class MainContent extends Component {
  render() {
    return (
        <div>
          {this.props.data.bookid}
          {this.props.data.chaptername}
          {this.props.data.author}
          {this.props.data.datetime}
          {this.props.data.content}

        </div>
    );
  }
}

export default MainContent;
