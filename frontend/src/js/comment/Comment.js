import React, {Component} from 'react';
import '../../css/comment.css'
import '../../css/content.css'
import {Button, ListGroupItem} from "react-bootstrap";
import Time from "../Time";
import hljs from "highlight.js";
import marked from 'marked';
import {NavLink} from "react-router-dom";

class Comment extends Component {

  constructor(props){
    super(props);

    this.handleDelete=this.handleDelete.bind(this);
  }

  handleDelete(){
    const {data} = this.props;
    let comment={
      commentid:data.commentid,
      commentuser:data.commentuser,
      content:data.content
    };

    this.props.onDelete(comment);
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
    let item=undefined;  //删除评论的原则是  自己发出的评论才能够由自己删除
    if (data.commentuser === localStorage.getItem("name")) {
      item = <Button variant="outline-danger"  onClick={this.handleDelete}>删除</Button>
    }
    let param = {
      author: this.props.author,
      bookid: data.commentid.bookid,
    };
    // console.log(param);

    param = JSON.stringify(param);
    let path = `/read/${param}/content/${data.commentid.chaptername}`;

    return (
        <ListGroupItem action variant="light">

          <div className="comment-margin">
            <span className="comment-user">{data.commentuser}{' '}:</span>
            <span className="title-date"><Time data={datetime}/></span>
            {item}
          </div>
          <NavLink to={{
            pathname:`${path}`,
          }}><p
              id="content"
              className="article-detail"
              dangerouslySetInnerHTML={{
                __html: data.content ? marked(data.content) : null,
              }}/>
          </NavLink>

        </ListGroupItem>
    );
  }
}

export default Comment