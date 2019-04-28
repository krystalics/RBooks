import React, {Component} from 'react';
import DirectoryList from "./DirectoryList";
import Content from "./Content";
import ReadSideBar from "./ReadSideBar";
import {_getDirectory} from '../api'

import '../../css/main.css'
// 由三个组件构成，目录 主要内容 评论列表
// 这里的 CommentList和之前Message中的不一样，这里是需要根据 Chapterid 来确定评论的，而之前的是经过高级组件固定化的

class Read extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookid: JSON.parse(this.props.match.params.data).bookid,
      author: JSON.parse(this.props.match.params.data).author,
      directory: [],
      // description:this.props.location.state.des.description
    }
  }


  componentDidMount() { //获得数据

    this.getData();

  }

  async getData(){
    const res=await _getDirectory(this.state.bookid);
    this.setState({directory: res.data});

  }

  render() {

    return (
        <div>

          <ReadSideBar id={this.state.bookid} author={this.state.author}/>
          <DirectoryList directory={this.state.directory}
                         param={this.props.match.params.data}
                         bookid={this.state.bookid}
                         author={this.state.author}/>
          <div>
          </div>
          <div id="article">
            <Content data={this.props.location.state}/>
          </div>
        </div>
    );
  }
}

export default Read;
