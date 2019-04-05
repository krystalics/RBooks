import React, {Component} from 'react';
import axios from "axios";
import DirectoryList from "./DirectoryList";
import MainContent from "./MainContent";
import {Route} from 'react-router-dom'
import Content from "./Content";


// 由三个组件构成，目录 主要内容 评论列表
// 这里的 CommentList和之前Message中的不一样，这里是需要根据 Chapterid 来确定评论的，而之前的是经过高级组件固定化的

class Read extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookid: JSON.parse(this.props.match.params.data).bookid,
      directory: [],
      // description:this.props.location.state.des.description
    }
  }

  componentWillMount() {

  }

  componentDidMount() { //获得数据
    // console.log(this.state.bookid); 有数据
    axios.get('http://localhost:8080/read/getdirectory?bookid=' + this.state.bookid)
    .then(res => {
      // console.log(res.data); //有数据
      this.setState({directory: res.data});
    }).catch(res => {
      // alert(res.data);
      // this.setState({directory: "加载错误"})
    });

    //   axios.all([this.getBook(), this.getComments()]).then(
    //       axios.spread((res1, res2) => {
    //         // alert(JSON.stringify(res2.data)); 评论正常获取
    //         this.setState({data: res1.data, commentsdata: res2.data});
    //         this.getData(); //保证是在获取之后渲染
    //       })).catch((res1, res2) => {
    //     this.setState({data: "加载错误", comments: "加载错误"})
    //   });
    // }
  }



  // 先渲染目录和 第一章的内容  ,然后绑定目录和内容的更新关系
  render() {
    // let content=document.getElementById("article");
    // console.log(content);
    // if(content.val===''){
    //   content.val=`{书本内容简介：${this.props.location.state.des.description}`;
    // }
    return (
        <div>
          {/*{this.state.directory}*/}
          {/*{JSON.stringify(this.props.match.params.data)}*/}

          <DirectoryList directory={this.state.directory}
                         param={this.props.match.params.data}/>
          <div>
            {/*{`书本内容简介：${this.state.description}`}*/}
          </div>
          <div id="article">
            <Content data={this.props.location.state}/>

            {/*<Route path="/read/:param/content/:chaptername"*/}
                   {/*component={MainContent}/>*/}
          </div>


        </div>
    );
  }
}

export default Read;
