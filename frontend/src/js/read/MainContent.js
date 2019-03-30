import React, {Component} from 'react';
import ReactJSON from 'react-json-view'
import CommentListByChapterId from "./Read";
class MainContent extends Component {
  render() {
    let chapterid={
      bookid:this.props.match.params.bookid,
      chaptername:this.props.match.params.chaptername
    };
    return (

        <div>
          <ReactJSON src={this.props.location.state}/>
          <CommentListByChapterId chapterid={chapterid}/>
          {/*{this.props.match.params.chaptername}*/}
          {/*{this.props.match.params.data}*/}
          {/*{this.props.location.state.bookid}*/}
          {/*{this.props.location.state.chaptername}*/}
          {/*{this.props.location.state.author}*/}
          {/*{this.props.location.state.datetime}*/}
          {/*{this.props.location.state.content}*/}

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
