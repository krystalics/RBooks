import React, { Component } from 'react';
import ReactJSON from 'react-json-view'

class Information extends Component {
  render() {

    return (
        <div>

          <ReactJSON src={this.props.data}/>
          {/*{this.props.data.userid}*/}
          {/*{this.props.data.username}*/}
          {/*{this.props.data.email}*/}
          {/*{this.props.data.selfintroduction}*/}
          {/*{this.props.data.photourl}*/}
          {/*{this.props.data.githubpage}*/}
          {/*{this.props.data.homepage}*/}
        </div>
    );
  }
}

export default Information;
