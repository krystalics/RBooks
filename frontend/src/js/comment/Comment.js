import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../css/comment.css'
import {ListGroupItem} from "react-bootstrap";

class Comment extends Component {

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
    return (
        <ListGroupItem action variant="light">

          <div>
            <span className="comment-user">{data.commentuser}</span>{' '}:
            <span className="comment-datetime">
                {data.datetime}
            </span>
          </div>
          <p dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(data.content)
          }}/>

        </ListGroupItem>
    );
  }
}

export default Comment