import React, {Component} from 'react';
import '../../css/comment.css'
import '../../css/content.css'
import {ListGroupItem} from "react-bootstrap";
import Time from "../Time";
import hljs from "highlight.js";
import marked from 'marked';

class Comment extends Component {

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

  _getProcessedContent(content) {
    // return content.replace(/`([\S\s]+?)`/g,`<code></code>`);
    // 将content 中的`` 替换成 <code></code>
    // 这样做会有严重的 Xss漏洞， 所以我们必须要手动把这些HTML标签转义，
    return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&$quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, `<code></code>`);

  }

  render() {
    const {data} = this.props; //获取评论数据
    let datetime=data.commentid.datetime;  //在用户评论后更新评论列表时


    return (
        <ListGroupItem action variant="light">

          <div className="comment-margin">
            <span className="comment-user">{data.commentuser}</span>{' '}:
            <span className="title-date"><Time data={datetime}/></span>

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