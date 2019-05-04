import React, {Component} from 'react';
import DirectoryList from "./DirectoryList";
import Content from "./Content";
import {_getDirectory} from '../api'

import '../../css/main.css'
import Button from "react-bootstrap/Button";
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
      style:this.styleIn
    }
  }

  componentDidMount() { //获得数据

    this.getData();

  }

  async getData() {
    const res = await _getDirectory(this.state.bookid);
    this.setState({directory: res.data});
  }

  styleIn = {
    height: "800px", borderRight: "1px solid rgba(0,0,0,0.1)", width: "200px"
  };
  styleOut={
    display:"none"
  };

  handleStyleChange(){
    if(this.state.style===this.styleOut){
      this.setState({style:this.styleIn})
    }else {
      this.setState({style:this.styleOut})
    }
  }

  render() {

    return (
        <div className="Content">
          <div className="content-left" style={this.state.style}>

            <DirectoryList directory={this.state.directory}
                           param={this.props.match.params.data}
                           bookid={this.state.bookid}
                           author={this.state.author}/>
          </div>

          <div id="article" className="content-middle"
               style={{marginLeft: "3%", width: "60%"}}>

            <Button onClick={this.handleStyleChange.bind(this)} className="mulu-left" variant="light">+</Button>
            <Content data={this.props.location.state}/>
          </div>

          {/*<div className="content-right"*/}
               {/*style={{marginLeft: "3%", width: "150px"}}>*/}
            {/*/!*<ReadSideBar id={this.state.bookid} author={this.state.author}/>*!/*/}
          {/*</div>*/}

        </div>
    );
  }
}

export default Read;
