import React, {Component} from 'react';

class MainContent extends Component {
  render() {
    return (
        <div>
          {this.props.match.params.chaptername}
          {this.props.match.params.data}
          {/*<ReactJSON src={this.props}/>*/}
          {/*{this.props.data.bookid}*/}
          {/*{this.props.data.chaptername}*/}
          {/*{this.props.data.author}*/}
          {/*{this.props.data.datetime}*/}
          {/*{this.props.data.content}*/}
        </div>
    );
  }
}

export default MainContent;
