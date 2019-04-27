import React, {Component} from 'react';
import '../../css/comment.css'
import '../../css/content.css'
import {ListGroupItem, Button} from "react-bootstrap";
import Time from "../Time";
import hljs from "highlight.js";
import marked from 'marked';
import axios from 'axios'

class Comment extends Component {

  constructor(props){
    super(props);

    this.handleDelete=this.handleDelete.bind(this);
  }

  handleDelete(){
    const {data} = this.props;
    alert(data.commentid);
    axios.post()
  }

  componentWillMount() {
    marked.setOptions({ //设置markdown相关配置
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
  }

  render() {
    const {data} = this.props; //获取评论数据
    let datetime = data.commentid.datetime;  //在用户评论后更新评论列表时

    return (
        <ListGroupItem action variant="light">

          <div className="comment-margin">
            <span className="comment-user">{data.commentuser}</span>{' '}:
            <span className="title-date"><Time data={datetime}/></span>
            <Button variant="outline-danger" style={{marginLeft:"10%"}} onClick={this.handleDelete}>删除</Button>
          </div>
          <p
              id="content"
              className="article-detail"
              dangerouslySetInnerHTML={{
                __html: data.content ? marked(data.content) : null,
              }}/>



        </ListGroupItem>
    );
  }
}

export default Comment