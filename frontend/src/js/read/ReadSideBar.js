import React, {Component} from 'react';

import '../../css/main.css'
import {ListGroup} from "react-bootstrap";
import axios from 'axios'
// 这个组件渲染  关注，收藏 到顶端，
class ReadSideBar extends Component {

  constructor(props){
    super(props);
    this.handleFollowAuthor=this.handleFollowAuthor.bind(this);
    this.handleFollowBook=this.handleFollowBook.bind(this);
  }

  handleFollowBook(){ //需要bookid 和 userid
    axios.post();
  }

  handleFollowAuthor(){ //需要authorid 和 userid

  }

  render() {

    return (
        <div className="sidebar_right">
          <ListGroup>
            <li onClick={this.handleFollowBook}><ListGroup.Item action variant="info">点赞收藏</ListGroup.Item></li>
            <li onClick={this.handleFollowAuthor}><ListGroup.Item action variant="primary">关注作者</ListGroup.Item>
            </li>
            <li><ListGroup.Item action variant="success">到顶部</ListGroup.Item>
            </li>

          </ListGroup>
        </div>
    )
        ;
  }
}

export default ReadSideBar;
