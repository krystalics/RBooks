import React, { Component } from 'react';

// 最终由 Navigator Container Footer 三个组件构成
class Card extends Component {
  render() {
    return (
        <div>
          {this.props.data.userid}
          {this.props.data.username}
          {this.props.data.email}
          {this.props.data.selfintroduction}
          {this.props.data.photourl}
          {this.props.data.githubpage}
          {this.props.data.homepage}
        </div>
    );
  }
}

export default Card;
